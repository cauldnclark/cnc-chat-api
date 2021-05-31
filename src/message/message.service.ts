import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import { CommonService } from 'src/common.service';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { MessageDeleted } from './message.type';
// import { MessageCreateType, MessageDeleted } from './message.type';

@Injectable()
export class MessageService extends CommonService {
  constructor(@InjectRepository(Message) private MessageRepo: Repository<Message>) {
    super({ context: 'Message' });
  }


  async findOneMessage(messageID:string) {
    const foundMessages = await this.MessageRepo.findOne(messageID)
    if(foundMessages) {
      return foundMessages
    } else {
      throw new GraphQLError(`Not Found`)
    }
  }



  // ------------------ CRUD ------------------ //
  async createMessage(message:string) {
    const newSmsHistory = this.MessageRepo.create({
      messageContent: message,
      userId:"555",
      sessionId:'zzz',
      isEdited:false,
      createdAt: new Date(),
      updatedAt: new Date()
    });
   return await newSmsHistory.save();
  }

  async getMessagesBySession(sessionID:string, page:number, sortDirection:string) {

    // Show Only 7 message per page
    const perPage:number = 7
    const sortBy:string = 'createdAt'

    const conditions = {
      skip: page > 0 ? (page - 1) * perPage : 0,
      take: perPage,
      order: { [sortBy || 'createdAt']: sortDirection || 'DESC' },
    };
    
    // Find message in database
    // if pages is true then use the conditions
    // if not then just find
    const foundMessages = await this.MessageRepo.find(page && conditions)

    // return only those message if the current sessionID is equal to the messages session ID's
    const mutatedMessages = foundMessages.filter(message => message.sessionId === sessionID) 
    return mutatedMessages
  }

  async updateMessage(messageID:string, editedMessage:string,userID:string) {
    const foundMessages = await this.findOneMessage(messageID)

    // if the current userID is equal to the messageId 
    // then the current user can update
    // else throw error
      if(foundMessages.userId === userID) {
        const newMessage = {
          ...foundMessages,
          messageContent:editedMessage,
          isEdited:true,
          updatedAt: new Date()
        }
        return  await this.MessageRepo.save(newMessage)
      } else {
        throw new GraphQLError(`Unathorized`)
      }
 
  }

  async deleteMessage(messageID:string, userID:string): Promise<MessageDeleted> {

    const foundMessages = await this.findOneMessage(messageID)

    // if the current userID is equal to the messageId 
    // then the current user can delete
    // else throw error

    if(foundMessages.userId === userID) {
      await this.MessageRepo.delete(messageID)
      return {
        message:'Deleted'
      }
    } else {
      throw new GraphQLError(`Unathorized`)
    }

  }

}
