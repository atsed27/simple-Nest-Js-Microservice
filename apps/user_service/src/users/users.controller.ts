import { Controller } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import {
  UserServiceController,
  CreateUserDto,
  UpdateUserDto,
  FindOneUserDto,
  UserServiceControllerMethods,
} from '@app/shared';

@Controller()
//@UserServiceControllerMethods()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('UserService', 'CreateUser')
  createUser(CreateUserDto: CreateUserDto) {
    return this.usersService.create(CreateUserDto);
  }
}
