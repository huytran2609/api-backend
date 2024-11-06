import compress from '@fastify/compress';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import middie from '@fastify/middie';
import multipath from '@fastify/multipart';
import rateLimit from '@fastify/rate-limit';
import fastifyStatic from '@fastify/static';
import fastify from 'fastify';
import socketio from 'fastify-socket.io';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { fileURLToPath } from 'url';
import { mongoServer } from './configs/mongo.js';
import { redisServer } from './configs/redis.js';
import { initDotENV } from './configs/nodedotenv.js';
import { initRuntime } from './configs/runtime.js';
import routes from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
initDotENV();
initRuntime();
const app = fastify({
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
        origin: [
            'http://localhost:3000',
            'http://localhost:3001',
            `http://192.168.1.7:3001`,
            'https://studio.apollographql.com',
            'https://iscv.ftisu.vn',
            'https://business.iscv.ftisu.vn',
        ],
    }),
    app.register(socketio, {
        cors: {
            origin: [
                'http://localhost:3000',
                'http://localhost:3001',
                `http://192.168.1.7:3001`,
                'https://studio.apollographql.com',
                'https://iscv.ftisu.vn',
                'https://business.iscv.ftisu.vn',
            ],
        },
    }),
    app.register(rateLimit, {
        max: 500,
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
            fieldNameSize: 100,
            fieldSize: 100,
            fields: 10,
            fileSize: 299 * 1024 * 1024,
            files: 10,
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
app.use('/machine', createProxyMiddleware({
    target: process.env.PYTHON_ENDPOINT,
    changeOrigin: true,
    pathRewrite: {
        '^/machine': '/static', // Path rewrite to remove '/static' prefix
    },
}));
// interview(app, pubClient as RedisClientType, subClient as RedisClientType);
app.listen({ port: Number(process.env.PORT) || 4000, host: process.env.HOST }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});

export { app, pubClient };
