import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export default class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsEmail()
  readonly email: string;
  
  @IsNotEmpty()
  readonly password: string
}