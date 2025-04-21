import {
  CreateUserDto,
  UserServiceClient,
  USER_SERVICE_NAME,
  SignInDto,
  FindOneUserDto,
} from '@app/shared';
import { status } from '@grpc/grpc-js';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UsersService implements OnModuleInit {
  private userService: UserServiceClient;

  constructor(@Inject(USER_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.userService =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  create(createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  signIn(signInDto: SignInDto) {
    return this.userService.signIn(signInDto);
  }
  async getOrder(id: FindOneUserDto) {
    try {
      return await lastValueFrom(this.userService.listUserOrders(id));
    } catch (err) {
      if (err.code === status.NOT_FOUND) {
        throw new NotFoundException('Product Is Not Found');
      }

      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
