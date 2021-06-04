import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { MessageType, MessageDeleted } from './message.type';

@Resolver(() => MessageType)
export class MessageResolver {
    constructor(private readonly messageService: MessageService) {}

    @Mutation(() => MessageType)
    createMessage(@Args('message') message:string ) {
       return this.messageService.createMessage(message)
    }
    @Mutation(() => MessageType)
    updateMessage(
        @Args('messageID') messageID:string,
        @Args('editedMessage') editedMessage:string,
        @Args('userID') userID:string,

        ) {
       return this.messageService.updateMessage(messageID,editedMessage,userID)
    }
    
    @Mutation(() => MessageDeleted)
    deleteMessage(
        @Args('messageID') messageID:string,
        @Args('userID') userID:string,

        ): Promise<MessageDeleted> {
       return this.messageService.deleteMessage(messageID,userID)
    }

    @Mutation(() => MessageType)
    seen(
        @Args('messageID') messageID:string,
        @Args('userID') userID:string,
        ){
       return this.messageService.seenMessage(messageID, userID)
    }

    @Query(() => [MessageType])
    getMessages(
        @Args('sessionID') sessionID:string,
        @Args('page', { nullable:true }) page:number,
        @Args('sort', { nullable:true }) sortDirection:string,

    ) {
       return this.messageService.getMessagesBySession(sessionID,page,sortDirection)
    }
    
}
