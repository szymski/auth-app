import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PasswordStrategy } from './strategies/password.strategy';
import { MikroORM } from 'mikro-orm';
import { MikroOrmModule } from 'nestjs-mikro-orm';
import { User } from '../user/entities/user.entity';
import { PasswordAuthGuard } from './guards/password.guard';

@Module({
  imports: [
    AuthModule,
    MikroOrmModule.forFeature({ entities: [User] })
  ],
  providers: [AuthService, PasswordStrategy, PasswordAuthGuard],
  controllers: [AuthController]
})
export class AuthModule {}
