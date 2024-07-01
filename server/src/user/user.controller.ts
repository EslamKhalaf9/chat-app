import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import UserService from "./user.service";
import CreateUserDto from "./dto/createUserDto";
import { UserResponseInterface } from "./types/userResponse.interface";
import UserEntity from "./user.entity";
import AuthGuard from "../auth/guards/auth.gaurd";

@Controller()
export default class UserController {

  constructor(private readonly userService: UserService) { }
  
  @Get("users")
  @UseGuards(AuthGuard)
  async findAll(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }

  @Get("users/:id")
  @UseGuards(AuthGuard)
  async findById(@Param("id") id: number): Promise<UserEntity> {
    return await this.userService.findById(id);
  }

  @Post("users")
  @UsePipes(new ValidationPipe())
  async createUser(@Body("user") createUserDto: CreateUserDto): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }
}
