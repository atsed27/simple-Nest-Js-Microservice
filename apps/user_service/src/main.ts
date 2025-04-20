import { NestFactory } from '@nestjs/core';
import { UserServiceModule } from './user-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { USER_SERVICE_PACKAGE_NAME } from '@app/shared';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../user-service.proto'),
        package: USER_SERVICE_PACKAGE_NAME,
      },
    },
  );

  await app.listen();
}
bootstrap();
