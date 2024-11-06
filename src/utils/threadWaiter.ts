/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Worker } from 'worker_threads';

export const threadWaiter = <T extends any>(
  name: string,
  workerData?: any,
  events?: {
    [event: string]: (...args: any) => any;
  },
  workerCallback?: (worker: Worker) => any,
): any => {
  return new Promise<T>((resolve, reject) => {
    const workerPath = `${process.env.NODE_ENV === 'development' ? './out/threads/' : './dist/'}${name}.js`;

    const worker = new Worker(workerPath, { workerData });
    workerCallback?.(worker);
    worker.on('message', ({ event, data }: { event: keyof typeof events; data: (...args: any) => any }) => {
      events?.[event]?.(data);
    });

    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) reject(new Error(`stopped with  ${code} exit code`));
      else resolve(code as any);
    });
  });
};
