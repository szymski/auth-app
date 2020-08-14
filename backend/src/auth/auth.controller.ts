import { Controller, Get, UseGuards, Request, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LoginDto } from './dtos/login.dto';
import { TokenDto } from './dtos/token.dto';
import { UserDto } from '../user/dtos/user.dto';
import { SessionService } from './session/session.service';
import { User } from '../user/entities/user.entity';

@Controller('auth')
@ApiTags('auth')
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
  loginPassword(@Request() req: { user: User }, @Body() dto: LoginDto): TokenDto {
    return {
      token: this.authService.generateJwtBearerToken(req.user)
    };
  }

  @Get('my-user')
  @UseGuards(AuthGuard())
  @ApiOkResponse({
    description: 'Returns currently logged in user based on bearer token.',
    type: UserDto
  })
  async getMyUser(): Promise<UserDto> {
    const user = await this.sessionService.getCurrentUser();
    return { username: user.username };
  }
}
