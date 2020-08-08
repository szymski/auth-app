import { User } from './user/entities/user.entity';
import { config } from './config';

export default {
  dbName: 'auth-app',
  type: 'mongo',
  clientUrl: config.db.connectionString,
  // // entitiesDirs: ['./dist/src/**/entities'],
  // entitiesDirs: [],
  // entitiesDirsTs: ['./**/entities'],
  entities: [User]
};
