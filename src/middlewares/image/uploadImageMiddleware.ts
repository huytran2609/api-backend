import { DoneFuncWithErrOrRes, FastifyReply, FastifyRequest } from 'fastify';
import sharp from 'sharp';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { EventEmitter } from 'events';
import ffmpeg from 'fluent-ffmpeg';
import { Readable } from 'stream';

type IForm = {
  [key: string]: Buffer[] | Buffer | string | string[] | number | number[];
};
declare module 'fastify' {
  interface FastifyRequest {
    form?: IForm;
  }
}

export const imageMiddleware = async (request: FastifyRequest, reply: FastifyReply, done: DoneFuncWithErrOrRes) => {
  const pm = new Promise<IForm>((resolve, reject) => {
    const form: IForm = {};
    let listTask = 0;
    const waiter = new EventEmitter();
    const mp = request.multipart(
      (field, file, filename, encoding, mimetype) => {
        const chunks: any = [];
        file.on('data', (chunk) => {
          chunks.push(chunk);
        });
        file.on('end', async () => {
          listTask++;
          const buffer = Buffer.concat(chunks);
          if (mimetype === 'image/png' || mimetype === 'image/jpg' || mimetype === 'image/jpeg') {
            const resizedBuffer = await sharp(buffer)
              .resize({ height: 1000, width: 1000, fit: 'contain' })
              .jpeg({ quality: 80 })
              .rotate()
              .toBuffer();
            if (form[field] === undefined) {
              form[field] = resizedBuffer;
            } else {
              if (!Array.isArray(form[field])) {
                form[field] = [form[field] as Buffer];
              }
              (form[field] as Buffer[]).push(resizedBuffer);
            }
          } else if (mimetype === 'video/mp4') {
            const folder_path = './uploads/temp/';
            if (!fs.existsSync(folder_path)) {
              await fs.promises.mkdir(folder_path, { recursive: true });
            }
            const inputPath = `${folder_path}${uuidv4()}.mp4`;
            // const outputPath = `./uploads/temp/${uuidv4()}.mp4`;

            // Write the buffer to a temporary file
            await fs.promises.writeFile(inputPath, buffer);

            // const resizePromise = new Promise<void>((resolve, reject) => {
            //   ffmpeg(inputPath)
            //     .size("800x800")
            //     .on("error", (err) => reject(err))
            //     .on("end", () => resolve())
            //     .save(outputPath);
            // });

            // await resizePromise;

            const resizedBuffer = await fs.promises.readFile(inputPath);

            if (form[field] === undefined) {
              form[field] = resizedBuffer;
            } else {
              if (!Array.isArray(form[field])) {
                form[field] = [form[field] as Buffer];
              }
              (form[field] as Buffer[]).push(resizedBuffer);
            }

            // Delete the temporary file
            await Promise.all([
              fs.promises.unlink(inputPath).catch((error) => console.error(error)),
              // fs.promises
              //   .unlink(outputPath)
              //   .catch((error) => console.error(error)),
            ]);
          }

          listTask--;
          waiter.emit('end');
        });
      },
      function (err) {
        if (err) {
          reply.send(err);
          return;
        }
        console.log('upload completed ' + process.memoryUsage().rss);
      },
    );

    mp.on('field', function (key, value) {
      if (form[key] === undefined) {
        form[key] = value;
      } else {
        if (!Array.isArray(form[key])) {
          form[key] = [form[key] as string];
        }
        (form[key] as string[]).push(value);
      }
    });

    mp.on('error', (error) => {
      reject(error);
    });

    mp.on('finish', async () => {
      if (!listTask) resolve(form);
      waiter.on('end', () => {
        if (!listTask) resolve(form);
      });
    });
  });
  await pm
    .then((success) => {
      request.form = success;
    })
    .catch((error) => {
      reply.status(500).send(error);
    });
};
