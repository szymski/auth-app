import { User } from './user/entities/user.entity';
import { config } from './config';
import { SavedExchangeRates } from './dashboard/entities/exchange-rates.entity';

export default {
  dbName: 'auth-app',
  type: 'mongo',
  clientUrl: config.db.connectionString,
  // // entitiesDirs: ['./dist/src/**/entities'],
  // entitiesDirs: [],
  // entitiesDirsTs: ['./**/entities'],
  entities: [User, SavedExchangeRates]
};
