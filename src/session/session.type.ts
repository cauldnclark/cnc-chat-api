import {
    Field,
    ID,
    ObjectType,
} from '@nestjs/graphql';

// types
export type SessionCreateType = {
    // 
};

// graphql types
@ObjectType('Session')
export class SessionType {
  @Field(() => ID)
  _id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
