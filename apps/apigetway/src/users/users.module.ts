import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_SERVICE_NAME, USER_SERVICE_PACKAGE_NAME } from '@app/shared';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    ClientsModule.register([
      {
        name: USER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          package: USER_SERVICE_PACKAGE_NAME,
          protoPath: join(__dirname, '../user-service.proto'),
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
