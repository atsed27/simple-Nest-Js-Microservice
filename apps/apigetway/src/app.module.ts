import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { AuthGuard } from './users/auth.guard';
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from 'libs/shared/database/database.module';

@Module({
  imports: [
    UsersModule,
    DrizzleModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
