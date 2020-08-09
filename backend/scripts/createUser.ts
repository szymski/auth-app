import { MikroORM } from 'mikro-orm';
import { User } from '../src/user/entities/user.entity';
import { MongoDriver } from 'mikro-orm/dist/drivers/MongoDriver';
import * as argon2 from "argon2";
import { PasswordHasher } from '../src/auth/password-hasher.service';

async function run() {
  const orm = await MikroORM.init<MongoDriver>();

  const hasher = new PasswordHasher();

  const user = new User();
  user.username = "user";
  user.authMethods = [];
  user.authMethods.push({
    method: "password",
    data: hasher.hash("Password1@3"),
  });
  await orm.em.persistAndFlush(user);
  await orm.close();
}

run()
  .then();
