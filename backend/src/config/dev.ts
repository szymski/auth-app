import { Config } from './index';

export default {
  app: {
    port: process.env.PORT ?? 3000,
  },
  db: {
    connectionString: process.env.CONNECTION_STRING ?? "mongodb://root:root@localhost:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false",
  },
  jwt: {
    secret: "DEV"
  }
} as Config;
