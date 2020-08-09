import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PasswordStrategy } from './strategies/password.strategy';
import { MikroOrmModule } from 'nestjs-mikro-orm';
import { User } from '../user/entities/user.entity';
import { PasswordAuthGuard } from './guards/password.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { config } from '../config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './guards/jwt.guard';
import { SessionService } from './session/session.service';
import { PasswordHasher } from './password-hasher.service';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    MikroOrmModule.forFeature({ entities: [User] }),
    JwtModule.register({
      secret: config.jwt.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [
    AuthService,
    PasswordStrategy,
    PasswordAuthGuard,
    JwtStrategy,
    JwtAuthGuard,
    SessionService,
    PasswordHasher,
  ],
  controllers: [AuthController],
  exports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    SessionService
  ]
})
export class AuthModule {}
