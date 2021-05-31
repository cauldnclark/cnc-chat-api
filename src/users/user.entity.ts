import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, MinLength } from 'class-validator';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;
}

@InputType()
export class CreateUserInput {
  @MinLength(2)
  @Field()
  firstName: string;

  @MinLength(2)
  @Field()
  lastName: string;

  @IsEmail()
  @Field()
  email: string;

  @MinLength(5)
  @Field()
  username: string;

  @MinLength(6)
  @Field()
  password: string;
}

@InputType()
export class UpdateUserInput {
  @IsOptional()
  @MinLength(2)
  @Field({ nullable: true })
  firstName: string;

  @IsOptional()
  @MinLength(2)
  @Field({ nullable: true })
  lastName: string;

  @IsOptional()
  @IsEmail()
  @Field({ nullable: true })
  email: string;

  @IsOptional()
  @MinLength(5)
  @Field({ nullable: true })
  username: string;

  @IsOptional()
  @MinLength(6)
  @Field({ nullable: true })
  password: string;
}
