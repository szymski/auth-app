import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class UserDto {
  @ApiProperty()
  username: string;
}

