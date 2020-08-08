import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { InjectRepository } from 'nestjs-mikro-orm';
import { User } from '../user/entities/user.entity';
import { EntityRepository } from 'mikro-orm';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class AppController {

  constructor(
    @InjectRepository(User) private readonly userRepository: EntityRepository<User>
  ) {}

  @Get()
  async getAllUsers() {
    return 123;
  }

}
