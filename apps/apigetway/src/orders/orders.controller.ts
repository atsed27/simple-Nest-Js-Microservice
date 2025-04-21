import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from '@app/shared/order-service';
import { validateOrReject } from 'class-validator';
import { ValidatedCreateOrderDto } from '@app/shared/dto/orders/createOrders';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@app/shared/decorators/auth.decorator';

@ApiTags('orders')
@Controller('orders')
@Public()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const validated = Object.assign(
      new ValidatedCreateOrderDto(),
      createOrderDto,
    );
    await validateOrReject(validated);
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  async ListAllOrder() {
    return this.ordersService.ListAllOrder();
  }
}
