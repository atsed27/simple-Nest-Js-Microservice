import { NestFactory } from '@nestjs/core';
import { UserServiceModule } from './user-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { User } from '@app/shared/constance';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../user-service.proto'),
        package: User,
      },
    },
  );

  await app.listen();
}
bootstrap();
