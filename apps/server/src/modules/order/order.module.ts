import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ConnectionService } from '../connection/connection.service';

@Module({
  imports: [],
  providers: [OrderService, ConnectionService],
  controllers: [OrderController],
})
export class OrderModule {}
