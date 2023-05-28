import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { EditUserDto } from './dto/edit-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(
    @Body(new ValidationPipe({ skipMissingProperties: true }))
    createUserDto: CreateUserDto,
  ) {
    return await this.usersService.createUser(createUserDto);
  }

  @Get()
  async getUsers(@Query(new ValidationPipe()) getUsersDto: GetUsersDto) {
    const offset = (getUsersDto.page - 1) * getUsersDto.limit;
    const users = await this.usersService.getUsers(offset, getUsersDto.limit);
    const length = await this.usersService.countAllUsers();
    return {
      users,
      length,
    };
  }

  @Patch(':id')
  async editUser(
    @Param('id') id: string,
    @Body(new ValidationPipe({ skipMissingProperties: true }))
    editUserDto: EditUserDto,
  ) {
    return await this.usersService.editUser(parseInt(id), editUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.deleteUser(parseInt(id));
  }
}
