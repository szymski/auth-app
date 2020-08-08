import { Controller, Get, Inject } from '@nestjs/common';
import { InjectRepository } from 'nestjs-mikro-orm';
import { User } from '../user/entities/user.entity';
import { EntityRepository } from 'mikro-orm';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(User) private readonly userRepository: EntityRepository<User>
  ) {}

  @Get()
  async getAllUsers() {
    return await this.userRepository.findAll();
  }
}
