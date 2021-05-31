import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/common.service';
import { Repository } from 'typeorm';
import { Session } from './session.entity';
// import { SessionCreateType } from './session.type';

@Injectable()
export class SessionService extends CommonService {
  constructor(@InjectRepository(Session) private SessionRepo: Repository<Session>) {
    super({ context: 'Session' });
  }

}
