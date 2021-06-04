import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { CreateUserInput, UpdateUserInput, User } from './user.entity';
import { UserPublicType, UserType } from './user.type';
import { UsersService } from './users.service';

@Resolver((of) => UserType)
export class UsersResolver {
  constructor(private userService: UsersService) {}

  @Query((returns) => UserPublicType, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async user(@Args('_id') _id: string): Promise<User> {
    return await this.userService.getUser(_id);
  }

  @Query((returns) => [UserPublicType], { nullable: true })
  async users(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Mutation((returns) => UserPublicType, { nullable: true })
  async signUp(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.userService.create(createUserInput);
  }

  @Mutation((returns) => UserPublicType, { nullable: true })
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Args('userId') userId: string,
  ) {
    return await this.userService.updateUser(updateUserInput, userId);
  }

  @Mutation((returns) => UserPublicType, { nullable: true })
  async deleteUser(@Args('userId') userId: string): Promise<User> {
    return this.userService.deleteUser(userId);
  }
}
