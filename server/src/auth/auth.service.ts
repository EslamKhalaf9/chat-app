import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import UserService from 'src/user/user.service';
import LoginUserDto from './dto/loginUserDto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }
  
  async login(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.userService.findByEmailWithPassword(loginUserDto.email);

    if (!user || !await bcrypt.compare(loginUserDto.password, user.password)) {
      console.log("user not found");
      throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }

    const payload = { sub: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }
}
