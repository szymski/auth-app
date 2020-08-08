import { Module } from '@nestjs/common';
import { MikroOrmModule } from 'nestjs-mikro-orm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    // MikroOrmModule.forFeature({ entities: [] }),
  ]
})
export class UserModule {}
