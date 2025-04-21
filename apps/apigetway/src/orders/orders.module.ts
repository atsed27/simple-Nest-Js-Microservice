import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  ORDER_SERVICE_NAME,
  ORDER_SERVICE_PACKAGE_NAME,
} from '@app/shared/order-service';
import { join } from 'path';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    ProductsModule,
    ClientsModule.register([
      {
        name: ORDER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          package: ORDER_SERVICE_PACKAGE_NAME,
          protoPath: join(__dirname, '../order-service.proto'),
          url: '0.0.0.0:5002',
        },
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
