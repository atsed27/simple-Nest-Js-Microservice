import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from 'libs/shared/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductsModule,
    DrizzleModule,
  ],
  controllers: [],
  providers: [],
})
export class ProductServiceModule {}
