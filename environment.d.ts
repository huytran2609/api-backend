declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_AUTH_TOKEN: string;
      APT_ENDPOINT_MONGODB: string;
      NODE_ENV: 'development' | 'production';
      PYTHON3: string;
      DATABASE: string;
      HOST: string;
      IPFS_HOST: string;
      IPFS_PORT: string;
      IPFS_PROTOCOL: string;
      ETHEREUM_ENDPOINT: string;
      PORT: string;
      PWD: string;
      SOCKET_POOL: string;
      GOOGLE_APPLICATION_CREDENTIALS: string;
      PYTHON_ENDPOINT: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
