import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '@app/shared';
import { validateOrReject } from 'class-validator';
import { ValidatedCreateUserDto } from '@app/shared/dto/user/createUser';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const validated = Object.assign(
      new ValidatedCreateUserDto(),
      createUserDto,
    );
    await validateOrReject(validated);
    return this.usersService.create(createUserDto);
  }
}
