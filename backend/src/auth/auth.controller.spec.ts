import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { MikroOrmModule } from 'nestjs-mikro-orm';
import { User } from '../user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { config } from '../config';
import mikroOrmConfig from '../mikro-orm.config';
import { AuthService } from './auth.service';
import { PasswordStrategy } from './strategies/password.strategy';
import { PasswordAuthGuard } from './guards/password.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt.guard';
import { SessionService } from './session/session.service';

describe('Auth Controller', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({
          defaultStrategy: 'jwt',
        }),
        MikroOrmModule.forFeature({ entities: [User] }),
        JwtModule.register({
          secret: "TEST_SECRET",
          signOptions: { expiresIn: '60m' },
        }),
        MikroOrmModule.forRoot({
          ...mikroOrmConfig,
          autoFlush: false,
          baseDir: __dirname,
        }),
        MikroOrmModule.forFeature({ entities: [User] }),
      ],
      providers: [
        AuthService,
        PasswordStrategy,
        PasswordAuthGuard,
        JwtStrategy,
        JwtAuthGuard,
        SessionService,
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
