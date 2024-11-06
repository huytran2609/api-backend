import sharp from 'sharp';

export const base64toBuffer = async (value: string) => {
  const buffer = Buffer.from(value, 'base64');

  // Resize the image using sharp
  return await sharp(buffer)
    .resize({ height: 800, width: 800, fit: 'contain' })
    .jpeg({ quality: 80 })
    .rotate()
    .toBuffer();
};
