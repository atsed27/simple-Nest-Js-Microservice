import {
  CreateUserDto,
  FindOneUserDto,
  Orders,
  SignInDto,
  SignInResponse,
  User,
} from '@app/shared';
import { users } from '@app/shared/schema/user.schema';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { DRIZZLE } from 'libs/shared/database/database.module';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { eq } from 'drizzle-orm';
import { orders } from '@app/shared/schema/orders.schema';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
const access_token_expire = 60 * 15; //15
@Injectable()
export class UsersService {
  constructor(
    @Inject(DRIZZLE) private db,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.db
      .insert(users)
      .values({
        ...createUserDto,
        password: await bcrypt.hash(
          createUserDto?.password,
          await bcrypt.genSalt(),
        ),
      })
      .returning();
    const { password, ...userWithoutPassword } = user[0];
    return userWithoutPassword;
  }

  async signIn(signInDto: SignInDto): Promise<SignInResponse> {
    const findUser = await this.db
      .select()
      .from(users)
      .where(eq(users.username, signInDto.username));

    if (
      !findUser ||
      !(await bcrypt.compare(signInDto.password, findUser[0].password))
    ) {
      throw new UnauthorizedException('Incorrect Credentials');
    }

    const payload = { sub: findUser[0].id, username: findUser[0].username };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: access_token_expire,
    });

    const { password, ...safeUser } = findUser[0];

    return {
      user: safeUser,
      accessToken,
      expiresIn: access_token_expire.toString(),
    };
  }

  async findUserOrder({ id }: FindOneUserDto): Promise<Orders> {
    const user = await this.db.select().from(users).where(eq(users.id, id));
    if (user.length === 0) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'User Is Not Found',
      });
    }
    const result = await this.db
      .select()
      .from(orders)
      .where(eq(orders.userId, id));

    return {
      orders: result,
    };
  }
}
