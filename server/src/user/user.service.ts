import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import CreateUserDto from "./dto/createUserDto";
import { InjectRepository } from "@nestjs/typeorm";
import UserEntity from "./user.entity";
import { Repository } from "typeorm";
import * as jwt from "jsonwebtoken";
import { UserResponseInterface } from "./types/userResponse.interface";
import LoginUserDto from "./dto/loginUserDto";
import { compare } from "bcrypt";

@Injectable()
export default class UserService {

  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
  
  async findById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { id } })
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {

    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email }
    })

    if (existingUser) {
      throw new HttpException('Email is taken', HttpStatus.UNPROCESSABLE_ENTITY)
    }

    const newUser = new UserEntity();
    
    Object.assign(newUser, createUserDto);

    return await this.userRepository.save(newUser);
  }

  async login(loginUserDto: LoginUserDto): Promise<UserResponseInterface> {
    const existingUser = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
      select: ["id", "email", "bio", "password", "username", "image"]
    })

    if (!existingUser || !await compare(loginUserDto.password, existingUser.password)) {
      throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);
    } 

    delete existingUser.password;
    return this.buildUserResponse(existingUser);
  }

  private generateJwt(user: UserEntity): string {
    return jwt.sign({
      id: user.id,
      username: user.username,
      email: user.email,
    }, "secret");
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    if (!user) {
      return null;
    }
    return {
      user: {
        ...user,
        token: this.generateJwt(user)
      }
    }
  }
}