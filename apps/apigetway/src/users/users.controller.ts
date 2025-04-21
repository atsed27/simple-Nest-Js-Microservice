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
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Public } from '@app/shared/decorators/auth.decorator';
import { FindOneUserDto, SignInDto } from '@app/shared/user-service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signUp')
  @Public()
  @ApiBody({ type: ValidatedCreateUserDto })
  async create(@Body() createUserDto: CreateUserDto) {
    const validated = Object.assign(
      new ValidatedCreateUserDto(),
      createUserDto,
    );
    await validateOrReject(validated);
    return this.usersService.create(createUserDto);
  }

  @Post('signIn')
  @Public()
  @ApiBody({ type: ValidatedCreateUserDto })
  async signIn(@Body() signInDto: SignInDto) {
    console.log('sign');
    return this.usersService.signIn(signInDto);
  }

  @Get('orders/:id')
  @Public()
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  async getOrder(@Param() id: FindOneUserDto) {
    return this.usersService.getOrder(id);
  }
}
