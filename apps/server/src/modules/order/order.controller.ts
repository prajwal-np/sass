import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { UpdateOrder, CreateOrder } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Order')
@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('')
  createOrder(@Body() payload: CreateOrder) {
    return this.orderService.createOrder(payload);
  }

  @Put('')
  updateOrder(@Body() payload: UpdateOrder) {
    return this.orderService.updateOrder(payload);
  }

  @Put('update_status/:id')
  updateStatus(@Param() payload: any) {
    return this.orderService.updateStatus(Number(payload.id));
  }

  @Get(':status')
  getOrderByStatus(@Param() payload: any) {
    return this.orderService.getOrdersByStatus(payload.status);
  }

  @Get('')
  getOrders() {
    return this.orderService.getOrders();
  }
}
