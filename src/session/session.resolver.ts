import { Resolver } from '@nestjs/graphql';
import { SessionType } from './session.type';

@Resolver(() => SessionType)
export class SessionResolver {}
