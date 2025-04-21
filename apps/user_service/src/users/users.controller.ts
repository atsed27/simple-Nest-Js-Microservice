import { Controller } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import {
  UserServiceController,
  CreateUserDto,
  UpdateUserDto,
  FindOneUserDto,
  UserServiceControllerMethods,
  SignInDto,
} from '@app/shared';

@Controller()
//@UserServiceControllerMethods()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('UserService', 'CreateUser')
  createUser(CreateUserDto: CreateUserDto) {
    return this.usersService.create(CreateUserDto);
  }

  @GrpcMethod('UserService', 'SignIn')
  signIn(signInDto: SignInDto) {
    return this.usersService.signIn(signInDto);
  }
}
