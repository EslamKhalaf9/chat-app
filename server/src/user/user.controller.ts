import { Body, Controller, Get, Post, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import UserService from "./user.service";
import CreateUserDto from "./dto/createUserDto";
import { UserResponseInterface } from "./types/userResponse.interface";
import LoginUserDto from "./dto/loginUserDto";
import UserEntity from "./user.entity";
import { ExpressRequest } from "src/types/expressRequest.interface";
import { User } from "./decorators/user.decorator";

@Controller()
export default class UserController {

  constructor(private readonly userService: UserService) { }
  
  @Get("users")
  async findAll(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }

  @Get("user")
  async currentUser(
    @Req() request: ExpressRequest,
    @User() user: any
  ): Promise<UserResponseInterface> {
    console.log("User", user);
    return this.userService.buildUserResponse(request.user);
  }

  @Post("users")
  @UsePipes(new ValidationPipe())
  async createUser(@Body("user") createUserDto: CreateUserDto): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post("users/login")
  @UsePipes(new ValidationPipe())
  async login(@Body("user") loginUserDto: LoginUserDto): Promise<UserResponseInterface> {
    return this.userService.login(loginUserDto);
  }
}