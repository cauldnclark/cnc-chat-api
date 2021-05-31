import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserInput, UpdateUserInput, User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async getUser(_id: string): Promise<User> {
    const user = await this.userRepo.findOne(_id);

    if (!user) throw new NotFoundException('User not found.');

    return user;
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    const { firstName, lastName, email, username, password } = createUserInput;

    if (await this.isUserExist(username, email))
      throw new BadRequestException('User is already existing.');

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const user = this.userRepo.create({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
    });

    await this.userRepo.save(user);

    delete user.password;

    return user;
  }

  async updateUser(
    updateUserInput: UpdateUserInput,
    userId: string,
  ): Promise<User> {
    await this.userRepo.update(userId, updateUserInput);

    const updatedUser = await this.getUser(userId);

    return updatedUser;
  }

  async deleteUser(userId: string): Promise<User> {
    const user = await this.getUser(userId);

    if (!user) throw new NotFoundException(`User not found.`);

    await this.userRepo.delete(userId);

    delete user.password;

    return user;
  }

  private async isUserExist(username: string, email: string): Promise<Boolean> {
    const userDup = await this.userRepo.findOne({ username });
    const emailDup = await this.userRepo.findOne({ email });

    if (userDup || emailDup) {
      return true;
    }

    return false;
  }
}
