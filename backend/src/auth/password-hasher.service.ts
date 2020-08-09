import { Injectable } from '@nestjs/common';
import * as argon2 from "argon2";

@Injectable()
export class PasswordHasher {

  hash(plainText: string) {
    return argon2.hash(plainText);
  }

  verify(hash: string, plainText: string) {
    return argon2.verify(hash, plainText);
  }

}
