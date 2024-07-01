import { IsEmail, IsNotEmpty } from "class-validator"

export default class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  password: string
}