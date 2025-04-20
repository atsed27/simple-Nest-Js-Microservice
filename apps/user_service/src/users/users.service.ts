import { CreateUserDto, User } from '@app/shared';
import { users } from '@app/shared/schema/user.schema';
import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from 'libs/shared/database/database.module';

@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE) private db) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    console.log('Create User DTO:', createUserDto);

    const user = await this.db
      .insert(users)
      .values({
        ...createUserDto,
      })
      .returning();
    console.log('usre', user);
    return user;
  }
}
