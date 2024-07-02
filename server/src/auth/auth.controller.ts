import { Body, Controller, Get, Post, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import LoginUserDto from './dto/loginUserDto';
import AuthGuard from './guards/auth.gaurd';
import { User } from 'src/user/decorators/user.decorator';
import UserEntity from 'src/user/user.entity';
import { Response } from 'express';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() loginUserDto: LoginUserDto, @Res({ passthrough: true }) response: Response): Promise<any> {
    const loginRes = await this.authService.login(loginUserDto);

    response.cookie('access_token', loginRes.access_token, {
      // domain: 'localhost:3000',
      httpOnly: true,
      // path: '/',
      secure: false,
      sameSite: 'lax',
    });
    return loginRes;
  }

  @Get("user")
  @UseGuards(AuthGuard)
  async currentUser(
    @User() user: UserEntity
  ): Promise<UserEntity> {
    return user;
  }
}
