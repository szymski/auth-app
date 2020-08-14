import { Injectable } from '@nestjs/common';
import * as argon2 from "argon2";

@Injectable()
export class PasswordHasher {

  /**
   * Hashes a password using argon2.
   * @param plainText The password to hash.
   */
  hash(plainText: string): Promise<string> {
    return argon2.hash(plainText);
  }

  /**
   * Verifies if a password is correct.
   * @param hash Hashed password.
   * @param plainText Password entered by user.
   */
  verify(hash: string, plainText: string): Promise<boolean> {
    return argon2.verify(hash, plainText);
  }

}
