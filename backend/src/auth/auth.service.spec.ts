import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PasswordHasher } from './password-hasher.service';
import { JwtModule } from '@nestjs/jwt';
import { config } from '../config';
import { User } from '../user/entities/user.entity';
import { ObjectId } from 'mongodb';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let store: User[];

  const hasher = new PasswordHasher();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: config.jwt.secret,
          signOptions: { expiresIn: '60m' },
        }),
      ],
      providers: [
        AuthService,
        PasswordHasher,
        {
          provide: 'UserRepository',
          useClass: class {
            async findOne(where: { username: string; }) {
              return store.find(x => x.username == where.username);
            };
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    store = [
      {
        _id: ObjectId.createFromTime(0),
        username: 'test',
        authMethods: [
          {
            method: 'password',
            data: await hasher.hash('test123'),
          },
        ],
      },
      {
        _id: ObjectId.createFromTime(1),
        username: 'nowpassworduser',
        authMethods: [],
      },
    ];
  });

  it('should throw if no such user', async () => {
    await expect(service.authenticate('asd', 'asd'))
      .rejects
      .toThrow(UnauthorizedException);
  });

  it('should throw if password invalid', async () => {
    await expect(service.authenticate('test', 'asd'))
      .rejects
      .toThrow(UnauthorizedException);
  });

  it('should throw if user has no password', async () => {
    await expect(service.authenticate('nowpassworduser', 'asd'))
      .rejects
      .toThrow(UnauthorizedException);
  });

  it('should authenticate user and return it', async () => {
    const user = await service.authenticate('test', 'test123');
    expect(user)
      .toBe(store[0]);
  });
});
