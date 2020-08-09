import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { InjectRepository } from 'nestjs-mikro-orm';
import { User } from '../../user/entities/user.entity';
import { EntityRepository } from 'mikro-orm';
import { AuthService } from '../auth.service';

@Injectable()
export class PasswordStrategy extends PassportStrategy(Strategy, "password") {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    return this.authService.authenticate(username, password);
  }
}
