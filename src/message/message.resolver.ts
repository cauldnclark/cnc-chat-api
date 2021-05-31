import { Resolver } from '@nestjs/graphql';
import { MessageType } from './message.type';

@Resolver(() => MessageType)
export class MessageResolver {}
