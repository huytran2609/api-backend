import { Socket } from 'socket.io';
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from './src/socket/types';
import { UserJwt } from '~types/auth';
declare module 'worker_threads' {
  interface MessagePort {
    postMessage(
      value: {
        event: string;
        data: any;
      },
      transferList?: ReadonlyArray<TransferListItem>,
    ): void;
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    io: Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    user?: UserJwt;
  }
}
