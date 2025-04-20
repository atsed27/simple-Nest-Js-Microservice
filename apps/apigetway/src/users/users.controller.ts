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
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: ValidatedCreateUserDto })
  async create(@Body() createUserDto: CreateUserDto) {
    const validated = Object.assign(
      new ValidatedCreateUserDto(),
      createUserDto,
    );
    await validateOrReject(validated);
    return this.usersService.create(createUserDto);
  }
}
