import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { join } from 'path';
import {
  PRODUCT_SERVICE_NAME,
  PRODUCT_SERVICE_PACKAGE_NAME,
} from '@app/shared/product-service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          package: PRODUCT_SERVICE_PACKAGE_NAME,
          protoPath: join(__dirname, '../product-service.proto'),
        },
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
