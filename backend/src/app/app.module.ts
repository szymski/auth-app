import { Module } from '@nestjs/common';
import { MikroOrmModule } from 'nestjs-mikro-orm';
import { UserModule } from '../user/user.module';
import { User } from '../user/entities/user.entity';
import mikroOrmConfig from '../mikro-orm.config';
import { AuthModule } from '../auth/auth.module';
import { DashboardModule } from '../dashboard/dashboard.module';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      ...mikroOrmConfig,
      autoFlush: false,
      baseDir: __dirname,
    }),
    MikroOrmModule.forFeature({ entities: [User] }),
    UserModule,
    AuthModule,
    DashboardModule,
  ],
  controllers: []
})
export class AppModule {}
