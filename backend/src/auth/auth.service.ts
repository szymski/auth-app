import { Inject, Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload';

@Injectable()
export class AuthService {

  constructor(private jwtService: JwtService) {
  }

  generateJwtToken(user: User) {
    return this.jwtService.sign({
      sub: user._id.toHexString(),
    } as JwtPayload);
  }

}
