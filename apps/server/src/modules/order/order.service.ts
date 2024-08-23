import { Inject, Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { CreateOrder, IPlaceOrder, UpdateOrder } from './dto';
import { Order, Status } from 'src/entity/order.entity';
import { REQUEST } from '@nestjs/core';
import { ConnectionService } from '../connection/connection.service';
import { Table } from 'src/entity/tables.entity';
import { TableOrder, TableOrderStatus } from 'src/entity/tableOrder.entity';
import { Products } from 'src/entity/product.entity';
import { OrderProducts } from 'src/entity/orderProduct.entity';

@Injectable()
export class OrderService {
  private tenantId: string;
  constructor(
    @Inject(REQUEST) private readonly request,
    private readonly connectionService: ConnectionService,
  ) {
    this.tenantId = this.request.tenantId;
  }

  async placeOrder(payload: IPlaceOrder) {
    const table = await (
      await this.connectionService.getRepository(Table, this.tenantId)
    ).findOneBy({
      id: payload.tableId,
    });
    const orderProducts = [];
    for (let i = 0; i < payload.order.products.length; i++) {
      const el = payload.order.products[i];
      const product = await (
        await this.connectionService.getRepository(Products, this.tenantId)
      ).findOneBy({
        id: el.id,
      });
      const orderProduct = await (
        await this.connectionService.getRepository(OrderProducts, this.tenantId)
      ).save({
        note: el.note,
        quantity: el.quantity,
        product,
      });
      orderProducts.push(orderProduct);
    }

    const order = await (
      await this.connectionService.getRepository(Order, this.tenantId)
    ).save({
      ...payload.order,
      products: orderProducts,
      status: Status.DELIVERED,
    });
    const orderTable = await (
      await this.connectionService.getRepository(TableOrder, this.tenantId)
    ).insert({
      guests: payload.guests,
      order: [order],
      table,
      status: TableOrderStatus.OCCUPIED,
    });
    return orderTable;
  }

  async createOrder(payload: CreateOrder): Promise<boolean> {
    (await this.connectionService.getRepository(Order, this.tenantId)).insert({
      ...payload,
      status: Status.INCOMING,
    });
    return true;
  }

  async updateOrder(payload: Partial<UpdateOrder>): Promise<boolean> {
    (await this.connectionService.getRepository(Order, this.tenantId)).update(
      {
        id: payload.id,
      },
      payload,
    );
    return true;
  }

  async getOrder(payload: Partial<UpdateOrder>): Promise<Order> {
    return await (
      await this.connectionService.getRepository(Order, this.tenantId)
    ).findOneBy({
      id: payload.id,
    });
  }

  async getOrders(ids?: string[]): Promise<Order[]> {
    return (
      await this.connectionService.getRepository(Order, this.tenantId)
    ).find({
      relations: ['products'],
      where: {
        id: In(ids),
      },
    });
  }

  async getOrdersByStatus(status: string): Promise<Order[]> {
    return (
      await this.connectionService.getRepository(Order, this.tenantId)
    ).find({
      where: { status: Status[status] },
      relations: ['products'],
      order: {
        created_at: 'DESC',
      },
    });
  }

  async updateStatus(id: string): Promise<Order> {
    const order = await (
      await this.connectionService.getRepository(Order, this.tenantId)
    ).findOneBy({
      id,
    });
    if (order.status === Status.INCOMING) {
      return (
        await this.connectionService.getRepository(Order, this.tenantId)
      ).save({
        ...order,
        status: Status.COMPLETED,
      });
    } else if (order.status === 'processing') {
      return (
        await this.connectionService.getRepository(Order, this.tenantId)
      ).save({
        ...order,
        status: Status.COMPLETED,
      });
    }
  }
}
