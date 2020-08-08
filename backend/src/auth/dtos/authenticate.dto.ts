import { IsIn } from 'class-validator';

export class AuthenticateDto {
  @IsIn(["password"])
  method: string;
}
