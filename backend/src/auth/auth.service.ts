import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload';
import { InjectRepository } from 'nestjs-mikro-orm';
import { EntityRepository } from 'mikro-orm';
import { PasswordHasher } from './password-hasher.service';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) private userRepository: EntityRepository<User>,
    private jwtService: JwtService,
    private passwordHasher: PasswordHasher) {
  }

  /**
   * Authenticates user using username and password.
   * @throws {UnauthorizedException} Username or password invalid.
   */
  async authenticate(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      username: username,
    });
    if(!user)
      throw new UnauthorizedException();

    const method = user.authMethods
      .find(x => x.method == "password");

    if(!method || !await this.passwordHasher.verify(method.data, password))
      throw new UnauthorizedException();

    return user;
  }

  generateJwtBearerToken(user: User): string {
    return this.jwtService.sign({
      sub: user._id.toHexString(),
    } as JwtPayload);
  }

}
