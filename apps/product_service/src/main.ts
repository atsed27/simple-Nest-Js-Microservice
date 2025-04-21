import { NestFactory } from '@nestjs/core';
import { ProductServiceModule } from './product_service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PRODUCT_SERVICE_PACKAGE_NAME } from '@app/shared/product-service';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProductServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../product-service.proto'),
        package: PRODUCT_SERVICE_PACKAGE_NAME,
      },
    },
  );
  await app.listen();
}
bootstrap();
