import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateUserInput, UpdateUserInput, User } from './user.entity';
import { UserType } from './user.type';
import { UsersService } from './users.service';

@Resolver((of) => UserType)
export class UsersResolver {
  constructor(private userService: UsersService) {}

  @Query((returns) => UserType)
  async user(@Args('_id') _id: string): Promise<User> {
    return await this.userService.getUser(_id);
  }

  @Query((returns) => [UserType])
  async users(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Mutation((returns) => UserType)
  async signUp(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.userService.create(createUserInput);
  }

  @Mutation((returns) => UserType)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Args('userId') userId: string,
  ) {
    return await this.userService.updateUser(updateUserInput, userId);
  }

  @Mutation((returns) => UserType)
  async deleteUser(@Args('userId') userId: string): Promise<User> {
    return this.userService.deleteUser(userId);
  }
}
