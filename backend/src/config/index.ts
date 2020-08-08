import devConfig from './dev';

export interface Config {
  app: {
    port: number;
  },
  db: {
    connectionString: string;
  },
  jwt: {
    secret: string;
  }
}

let cfg: Config;

switch (process.env.ENV) {
  case "PROD":
    console.log("Using production environment");
    throw new Error("No production environment config file");
    break;
  default:
    console.log("Using development environment");
    cfg = devConfig;
    break;
}

export const config = cfg;
