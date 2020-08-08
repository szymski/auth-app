import { MikroORM } from 'mikro-orm';
import { User } from '../src/user/entities/user.entity';
import { MongoDriver } from 'mikro-orm/dist/drivers/MongoDriver';

async function run() {
  const orm = await MikroORM.init<MongoDriver>();

  const user = new User();
  user.username = "user";
  user.authMethods = [];
  user.authMethods.push({
    method: "password",
    data: "Password1@3"
  });
  orm.em.persist(user);

  await orm.em.flush();
  await orm.close();
}

run()
  .then();
