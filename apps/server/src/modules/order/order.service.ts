import { Inject, Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { CreateOrder, UpdateOrder } from './dto';
import { Product } from 'src/entity/Product.entity';
import { Order } from 'src/entity/order.entity';
import { REQUEST } from '@nestjs/core';
import { ConnectionService } from '../connection/connection.service';

@Injectable()
export class OrderService {
  private orderRepo: Repository<Order>;
  private productRepo: Repository<Product>;
  constructor(
    @Inject(REQUEST) private readonly request,
    private readonly connectionService: ConnectionService,
  ) {
    const tenantId = this.request.tenantId;
    const dataSource = this.connectionService.getDataSource(tenantId);
    dataSource.then((data) => {
      this.orderRepo = data.getRepository(Order);
      this.productRepo = data.getRepository(Product);
    });
  }

  async createOrder(payload: CreateOrder): Promise<boolean> {
    console.log(typeof payload.product);

    console.log(payload);

    await this.orderRepo.save({
      ...payload,
      status: 'incoming',
    });
    return true;
  }

  async updateOrder(payload: Partial<UpdateOrder>): Promise<boolean> {
    await this.orderRepo.update(
      {
        id: payload.id,
      },
      payload,
    );
    return true;
  }

  async getOrder(payload: Partial<UpdateOrder>): Promise<Order> {
    return this.orderRepo.findOneBy({
      id: payload.id,
    });
  }

  async getOrders(): Promise<Order[]> {
    return this.orderRepo.find({
      relations: ['products'],
    });
  }

  async getOrdersByStatus(status: string): Promise<Order[]> {
    return this.orderRepo.find({
      where: { status: status },
      relations: ['products'],
    });
  }

  async updateStatus(id: number): Promise<Order> {
    const order = await this.orderRepo.findOneBy({
      id,
    });
    if (order.status === 'incoming') {
      return this.orderRepo.save({
        ...order,
        status: 'complete',
      });
    } else if (order.status === 'processing') {
      return this.orderRepo.save({
        ...order,
        status: 'complete',
      });
    }
  }
}
