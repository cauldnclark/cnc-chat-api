import {
    Field,
    ID,
    ObjectType,
} from '@nestjs/graphql';

// types
export type MessageCreateType = {
  sessionId: string;
  userId: string;
  messageContent: string;
};

// graphql types
@ObjectType('Message')
export class MessageType {
  @Field(() => ID)
  _id: string;

  @Field()
  sessionId: string;

  @Field()
  userId: string;

  @Field()
  messageContent: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
