import { Controller, Get, Query, UseGuards, Request, Post, Inject } from '@nestjs/common';
import { AuthenticateDto } from './dtos/authenticate.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('login/password')
  @UseGuards(AuthGuard('password'))
  loginPassword(@Request() req) {
    return {
      token: this.authService.generateJwtToken(req.user)
    };
  }
}
