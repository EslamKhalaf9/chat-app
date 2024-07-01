import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import CreateUserDto from "./dto/createUserDto";
import { InjectRepository } from "@nestjs/typeorm";
import UserEntity from "./user.entity";
import { Repository } from "typeorm";
import { UserResponseInterface } from "./types/userResponse.interface";

@Injectable()
export default class UserService {

  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
  
  async findById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { id } })
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { email } })
  }

  async findByEmailWithPassword(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { email }, select: ["id", "email", "username", "bio", "image", "password"] })
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

  buildUserResponse(user: UserEntity): UserResponseInterface {
    if (!user) {
      return null;
    }
    return {
        user: {
          ...user,
        }
    }
  }
}