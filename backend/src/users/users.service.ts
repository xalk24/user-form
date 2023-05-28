import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import { EditUserDto } from './dto/edit-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {
    dayjs.extend(utc);
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = new User();
    user.family = createUserDto.family;
    user.name = createUserDto.name;
    user.birthday = dayjs.utc(createUserDto.birthday).toDate();
    return await this.usersRepository.save(user);
  }
  async getUsers(offset: number, limit: number) {
    return await this.usersRepository.find({
      skip: offset,
      take: limit,
      order: {
        id: 'ASC',
      },
    });
  }

  async countAllUsers() {
    return await this.usersRepository.count();
  }

  async editUser(id: number, editUserDto: EditUserDto) {
    const user = await this.usersRepository.findOneBy({ id: id });
    if (editUserDto.family) {
      user.family = editUserDto.family;
    }
    if (editUserDto.birthday) {
      user.birthday = dayjs.utc(editUserDto.birthday).toDate();
    }
    if (editUserDto.name) {
      user.name = editUserDto.name;
    }
    return await this.usersRepository.save(user);
  }

  async deleteUser(id: number) {
    return await this.usersRepository.delete({ id: id });
  }
}
