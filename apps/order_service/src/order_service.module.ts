import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from 'libs/shared/database/database.module';
import { ProductsModule } from 'apps/product_service/src/products/products.module';

@Module({
  imports: [
    OrdersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductsModule,
    DrizzleModule,
  ],
  controllers: [],
  providers: [],
})
export class OrderServiceModule {}
