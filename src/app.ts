import compress from '@fastify/compress';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import middie from '@fastify/middie';
import multipath from '@fastify/multipart';
import rateLimit from '@fastify/rate-limit';
import fastifyStatic from '@fastify/static';
import fastify, { FastifyInstance } from 'fastify';
import socketio from 'fastify-socket.io';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { fileURLToPath } from 'url';
import { mongoServer, redisServer } from '~configs/index';

import { initDotENV } from '~configs/nodedotenv';
import { initRuntime } from '~configs/runtime';
import routes from '~routes/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

initDotENV();

initRuntime();

const app: FastifyInstance = fastify({
  logger: {
    level: 'info',
    file: './logger.log', // Will use pino.destination()
  },
});

app.setErrorHandler(async (error, request, reply) => {
  console.error(error);
  reply.status(500).send(error);
});
const { pubClient, subClient } = await redisServer();
await Promise.all([
  app.register(cors, {
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'],
  }),
  app.register(socketio, {
    cors: {
      origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'],
    },
  }),
  app.register(rateLimit, {
    max: 1000,
    timeWindow: '1 minute',
  }),
  app.register(helmet, {
    // contentSecurityPolicy: false,
    // crossOriginEmbedderPolicy: false,
    // crossOriginOpenerPolicy: false,
    // crossOriginResourcePolicy: false,
    // dnsPrefetchControl: false,
    // expectCt: false,
    // frameguard: false,
    // hidePoweredBy: false,
    // hsts: false,
    // ieNoOpen: false,
    // noSniff: false,
    // originAgentCluster: false,
    // permittedCrossDomainPolicies: false,
    // referrerPolicy: false,
    // xssFilter: false,
    // crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
  app.register(compress),
  app.register(middie),
  app.register(multipath, {
    // addToBody: true,
    limits: {
      fieldNameSize: 100, // Max field name size in bytes
      fieldSize: 100, // Max field value size in bytes
      fields: 10, // Max number of non-file fields
      fileSize: 299 * 1024 * 1024, // 10 MB
      files: 10, // Max number of file fields
      headerPairs: 2000, // Max number of header key=>value pairs
    },
  }),
  app.register(fastifyStatic, {
    root: path.join(__dirname, '..', 'public'),
    prefix: '/public/', // optional: default '/'
  }),
  app.register(routes),
  mongoServer(),
]);

app.use(
  '/machine',
  createProxyMiddleware({
    target: process.env.PYTHON_ENDPOINT,
    changeOrigin: true,
    pathRewrite: {
      '^/machine': '/static', // Path rewrite to remove '/static' prefix
    },
  }),
);

// interview(app, pubClient as RedisClientType, subClient as RedisClientType);

app.listen({ port: Number(process.env.PORT) || 4000, host: process.env.HOST }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
export { app, pubClient };
