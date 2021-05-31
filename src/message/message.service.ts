import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/common.service';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
// import { MessageCreateType } from './message.type';

@Injectable()
export class MessageService extends CommonService {
  constructor(@InjectRepository(Message) private MessageRepo: Repository<Message>) {
    super({ context: 'Message' });
  }

}
