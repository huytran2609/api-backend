import redis from 'redis';

export async function redisServer() {
  const pubClient = redis.createClient({ url: process.env.REDIS_URI });
  const subClient = pubClient.duplicate();
  Promise.all([pubClient.connect(), subClient.connect()]);
  return {
    pubClient,
    subClient,
  };
}
