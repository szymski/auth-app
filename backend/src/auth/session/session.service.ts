import { Inject, Injectable, Req, Scope } from '@nestjs/common';
import { InjectRepository } from 'nestjs-mikro-orm';
import { User } from '../../user/entities/user.entity';
import { EntityRepository } from 'mikro-orm';
import { REQUEST } from '@nestjs/core';
import { AuthenticatedRequest } from '../interfaces/authenticated-request.interface';

@Injectable({scope: Scope.REQUEST})
export class SessionService {
  constructor(
    @Inject(REQUEST) private request: AuthenticatedRequest,
    @InjectRepository(User) private userRepository: EntityRepository<User>) {
  }

  /**
   * Returns the currently logged in user, base on bearer token.
   */
  async getCurrentUser(): Promise<User> {
    return await this.userRepository.findOne({
      _id: this.request.user.userId,
    });
  }
}
