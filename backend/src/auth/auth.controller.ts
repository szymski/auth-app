import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { AuthenticateDto } from './dtos/authenticate.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('login/password')
  @UseGuards(AuthGuard('password'))
  loginPassword(@Request() req) {
    return req.user;
  }
}
