import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { InjectRepository } from 'nestjs-mikro-orm';
import { User } from '../../user/entities/user.entity';
import { EntityRepository } from 'mikro-orm';

@Injectable()
export class PasswordStrategy extends PassportStrategy(Strategy, "password") {
  constructor(@InjectRepository(User) private userRepository: EntityRepository<User>) {
    super();
  }

  /**
   * Authenticates user using username and password.
   */
  async validate(username: string, password: string) {
    const user = await this.userRepository.findOne({
      username: username,
    });
    if(!user)
      throw new UnauthorizedException();

    const method = user.authMethods
      .find(x => x.method == "password");

    if(!method || method.data !== password)
      throw new UnauthorizedException();

    return user;
  }
}
