import { Controller } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from '@app/shared/order-service';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @GrpcMethod('OrderService', 'CreateOrder')
  create(createOrderdto: CreateOrderDto) {
    return this.ordersService.create(createOrderdto);
  }

  @GrpcMethod('OrderService', 'ListOrders')
  listOrder({}) {
    return this.ordersService.listOrder({});
  }
}
