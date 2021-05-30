import { Query, Resolver } from '@nestjs/graphql';

@Resolver('App')
export class AppResolver {
  @Query(() => String)
  start() {
    return 'Hello GraphQL World';
  }
}
