import { NestFactory } from '@nestjs/core';
import { OrderServiceModule } from './order_service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ORDER_SERVICE_PACKAGE_NAME } from '@app/shared/order-service';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrderServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../order-service.proto'),
        package: ORDER_SERVICE_PACKAGE_NAME,
        url: '0.0.0.0:5002',
      },
    },
  );
  await app.listen();
}
bootstrap();
