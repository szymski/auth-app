import { Controller, Get, Query, UseGuards, Request, Post, Inject, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiOkResponse, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LoginDto } from './dtos/login.dto';
import { TokenDto } from './dtos/token.dto';
import { UserDto } from '../user/dtos/user.dto';
import { SessionService } from './session/session.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private sessionService: SessionService) {
  }

  @Post('login/password')
  @UseGuards(AuthGuard('password'))
  @ApiCreatedResponse({
    description: 'Logged in successfully.',
    type: TokenDto,
  })
  @ApiUnauthorizedResponse({ description: 'Authentication failed.' })
  loginPassword(@Request() req, @Body() dto: LoginDto): TokenDto {
    return {
      token: this.authService.generateJwtToken(req.user)
    };
  }

  @Get('my-user')
  @UseGuards(AuthGuard())
  @ApiOkResponse({
    type: UserDto
  })
  async getMyUser(): Promise<UserDto> {
    const user = await this.sessionService.getCurrentUser();
    return { username: user.username };
  }
}
