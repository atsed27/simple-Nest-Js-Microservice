import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  PRODUCT_SERVICE_NAME,
  ProductDto,
  UpdateProductDto,
} from '@app/shared/product-service';
import { firstValueFrom, Observable } from 'rxjs';
import { DRIZZLE } from 'libs/shared/database/database.module';
import { CreateOrderDto } from '@app/shared/order-service';
import { orders } from '@app/shared/schema/orders.schema';

interface ProductServiceClient {
  getOneProduct(data: { id: string }): Observable<ProductDto>;
  updateProduct(data: UpdateProductDto): Observable<UpdateProductDto>;
}

@Injectable()
export class OrdersService implements OnModuleInit {
  private productServiceClient: ProductServiceClient;

  constructor(
    @Inject(DRIZZLE) private db,
    @Inject(PRODUCT_SERVICE_NAME) private productClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.productServiceClient =
      this.productClient.getService<ProductServiceClient>('ProductService');
  }

  async create(createOrderdto: CreateOrderDto) {
    //find prodct
    const product = await firstValueFrom(
      this.productServiceClient.getOneProduct({ id: createOrderdto.productId }),
    );

    const order = await this.db
      .insert(orders)
      .values({
        ...createOrderdto,
        totalPrice: product?.price * createOrderdto.quantity,
      })
      .returning();

    return order[0];
  }
  async listOrder({}) {
    const orderList = await this.db.select().from(orders);
    return { orders: orderList };
  }
}
