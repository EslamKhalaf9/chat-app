import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export default class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  text: string

  @IsNotEmpty()
  @IsNumber()
  from: number

  @IsNotEmpty()
  @IsNumber()
  to: number
}