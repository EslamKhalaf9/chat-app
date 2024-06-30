import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import MessageEntity from './message.entity';
import { Repository } from 'typeorm';
import CreateMessageDto from './dto/createMessageDto';

@Injectable()
export class MessageService {
  constructor(@InjectRepository(MessageEntity) private readonly messageRepository: Repository<MessageEntity>) { }
  
  async findMesssages(from: number, to: number, page: number, limit: number): Promise<MessageEntity[]> {
    const messages = await this.messageRepository.find({
      where: [
        { from: { id: from }, to: { id: to } },
        { from: { id: to }, to: { id: from } }
      ],
      skip: (page - 1) * limit,
      take: limit,
      order: {
        createdAt: 'DESC'
      },
      relations: ['from', 'to']
    });

    return messages.map(message => {
      const recieved = message.from.id !== from;
      delete message.from;
      delete message.to;

      return {
        ...message,
        recieved,
      }
    })

  }

  async createMessage(createMessageDto: CreateMessageDto): Promise<MessageEntity> {
    const message = await this.messageRepository.create({
      text: createMessageDto.text,
      from: { id: createMessageDto.from },
      to: { id: createMessageDto.to }
    })
    return await this.messageRepository.save(message)
  }
}
