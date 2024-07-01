import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import LoginUserDto from './dto/loginUserDto';
import AuthGuard from './guards/auth.gaurd';
import { User } from 'src/user/decorators/user.decorator';
import UserEntity from 'src/user/user.entity';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() loginUserDto: LoginUserDto): Promise<any> {
    return this.authService.login(loginUserDto);
  }

  @Get("user")
  @UseGuards(AuthGuard)
  async currentUser(
    @User() user: UserEntity
  ): Promise<UserEntity> {
    return user;
  }
}
