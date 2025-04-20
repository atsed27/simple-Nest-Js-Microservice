import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DrizzleModule } from 'libs/shared/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    DrizzleModule,
  ],
  controllers: [],
  providers: [],
})
export class UserServiceModule {}
