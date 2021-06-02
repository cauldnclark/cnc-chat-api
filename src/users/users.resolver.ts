import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateUserInput, UpdateUserInput, User } from './user.entity';
import { UserPublicType, UserType } from './user.type';
import { UsersService } from './users.service';

@Resolver((of) => UserType)
export class UsersResolver {
  constructor(private userService: UsersService) {}

  @Query((returns) => UserPublicType)
  async user(@Args('_id') _id: string): Promise<User> {
    return await this.userService.getUser(_id);
  }

  @Query((returns) => [UserPublicType])
  async users(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Mutation((returns) => UserPublicType)
  async signUp(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.userService.create(createUserInput);
  }

  @Mutation((returns) => UserPublicType)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Args('userId') userId: string,
  ) {
    return await this.userService.updateUser(updateUserInput, userId);
  }

  @Mutation((returns) => UserPublicType)
  async deleteUser(@Args('userId') userId: string): Promise<User> {
    return this.userService.deleteUser(userId);
  }
}
