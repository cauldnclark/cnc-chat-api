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
@ObjectType('MessageDeleted') 
export class MessageDeleted {
  @Field()
  message: string;
}

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

  @Field({ nullable:true })
  isEdited: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
