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
    try {
      const user = await this.userRepo.findOne(_id);
      if (!user) throw new NotFoundException('User not found.');

      return user;
    } catch (ex) {
      console.log(ex.message);
      return null;
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      return await this.userRepo.find();
    } catch (ex) {
      console.log(ex.message);
      return null;
    }
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    const { firstName, lastName, email, username, password } = createUserInput;

    if (await this.isUserExist(username, email))
      throw new BadRequestException('User is already existing.');

    try {
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
    } catch (ex) {
      console.log(ex);
      return null;
    }
  }

  async updateUser(
    updateUserInput: UpdateUserInput,
    userId: string,
  ): Promise<User> {
    try {
      await this.userRepo.update(userId, updateUserInput);

      const updatedUser = await this.getUser(userId);

      return updatedUser;
    } catch (ex) {
      console.log(ex.message);
      return null;
    }
  }

  async deleteUser(userId: string): Promise<User> {
    const user: User = await this.getUser(userId);
    if (!user) throw new NotFoundException(`User not found.`);

    try {
      await this.userRepo.delete(userId);

      delete user.password;
      return user;
    } catch (ex) {
      console.log(ex.message);
      return null;
    }
  }

  async login(username: string): Promise<User> {
    try {
      const user: User = await this.userRepo.findOne({
        username,
      });

      return user ? user : null;
    } catch (ex) {
      console.log(ex.message);
      return null;
    }
  }

  private async isUserExist(username: string, email: string): Promise<Boolean> {
    try {
      const userDup: User = await this.userRepo.findOne({ username });
      const emailDup: User = await this.userRepo.findOne({ email });

      if (userDup || emailDup) {
        return true;
      }

      return false;
    } catch (ex) {
      console.log(ex.message);
      return null;
    }
  }
}
