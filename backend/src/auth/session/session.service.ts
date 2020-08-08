import { Inject, Injectable, Req, Scope } from '@nestjs/common';
import { InjectRepository } from 'nestjs-mikro-orm';
import { User } from '../../user/entities/user.entity';
import { EntityRepository } from 'mikro-orm';
import { REQUEST } from '@nestjs/core';

@Injectable({scope: Scope.REQUEST})
export class SessionService {
  constructor(
    @Inject(REQUEST) private request,
    @InjectRepository(User) private userRepository: EntityRepository<User>) {
  }

  async getCurrentUser() {
    return await this.userRepository.findOne({
      _id: this.request.user.userId,
    });
  }
}
