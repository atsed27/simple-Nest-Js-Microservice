import {
  CreateOrderDto,
  ListOrdersDto,
  ORDER_SERVICE_NAME,
  OrderServiceClient,
} from '@app/shared/order-service';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
  private oredrService: OrderServiceClient;

  constructor(@Inject(ORDER_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.oredrService =
      this.client.getService<OrderServiceClient>(ORDER_SERVICE_NAME);
  }

  create(createOrderDto: CreateOrderDto) {
    return this.oredrService.createOrder(createOrderDto);
  }
  async ListAllOrder() {
    return this.oredrService.listOrders({});
  }
}
