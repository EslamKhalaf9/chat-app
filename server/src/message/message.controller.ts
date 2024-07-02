import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessageService } from './message.service';
import { User } from 'src/user/decorators/user.decorator';
import CreateMessageDto from './dto/createMessageDto';
import AuthGuard from 'src/auth/guards/auth.gaurd';

@Controller('message')
export class MessageController {

  constructor(private readonly messageService: MessageService) { }
  
  @Get("/:id")
  @UseGuards(AuthGuard)
  async getMessages(@Param("id") to: number, @User("id") from: number) {
    return await this.messageService.findMesssages(from, to, 1, 10);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  async createMessage( @User("id") from: number, @Body() createMessageDto: CreateMessageDto) {
    if (createMessageDto.from !== from) {
      throw new HttpException("Invalid Input", HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return await this.messageService.createMessage(createMessageDto);
  }
}
