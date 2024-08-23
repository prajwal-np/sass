import { Inject, Injectable } from '@nestjs/common';
import { CreateTable, createRoom, UpdateTable } from './dto';
import {
  Table as RestroTables,
  Table,
  TableStatus,
} from 'src/entity/Tables.entity';
import { REQUEST } from '@nestjs/core';
import {
  ConnectionService,
  getTenantConnection,
} from '../connection/connection.service';
import { TableCategory } from 'src/entity/tableCategoy.entity';
import { OrderService } from '../order/order.service';
import { DataSource, Repository } from 'typeorm';
import { Status } from 'src/entity/order.entity';
import { TableOrderStatus } from 'src/entity/tableOrder.entity';

@Injectable()
export class TableService {
  private tenantId: string;
  constructor(
    private readonly connectionService: ConnectionService,
    private orderService: OrderService,

    private repo: Repository<RestroTables>,
  ) {}

  async createRoom(payload: createRoom) {
    await (
      await this.connectionService.getRepository(TableCategory, 'tenant_1')
    ).insert(payload);
    return true;
  }

  async getroomById(id: string) {
    const room = await (
      await this.connectionService.getRepository(TableCategory, this.tenantId)
    ).findOneBy({
      id,
    });
    return room;
  }
  async createTable(payload: CreateTable): Promise<boolean> {
    try {
      const dataSouce = new DataSource(getTenantConnection('tenant_1'));
      await dataSouce.initialize();
      const room: TableCategory = (await dataSouce
        .getRepository('table_category')
        .findOneBy({
          id: payload.category,
        })) as TableCategory;
      dataSouce.getRepository('table').save({
        ...payload,
        room: room,
      });
      return !!true;
    } catch (e) {
      console.log(e);
    }
  }

  async updateTable(payload: Partial<UpdateTable>): Promise<boolean> {
    const table = await this.getTable(payload);
    const orders = await this.orderService.getOrders(payload.order);
    (
      await this.connectionService.getRepository(RestroTables, this.tenantId)
    ).update(
      {
        id: payload.id,
      },
      { ...table, ...payload, category: table.category },
    );
    return true;
  }

  async getTable(payload: Partial<UpdateTable>): Promise<RestroTables> {
    return await (
      await this.connectionService.getRepository(RestroTables, this.tenantId)
    ).find({
      where: {
        id: payload.id,
      },
      relations: ['order'],
    })[0];
  }

  async getAll(): Promise<TableCategory[]> {
    return (await this.connectionService.getDataSource('tenant_1'))
      .getRepository(TableCategory)
      .createQueryBuilder('tc')
      .leftJoinAndMapMany(
        'tc.tables',
        'table',
        'table',
        'tc.id=table.categoryId',
      )
      .leftJoinAndMapMany(
        'table.orders',
        'table_order',
        'tableOrder',
        'table.id=tableOrder.tableId AND tableOrder.status != :status',
        {
          status: TableOrderStatus.COMPLETED,
        },
      )
      .leftJoinAndMapMany(
        'tableOrder.order',
        'order',
        'order',
        'tableOrder.id = order.tableOrderId AND order.status != :completed AND order.status != :delivered',
        {
          completed: Status.COMPLETED,
          delivered: Status.DELIVERED,
        },
      )
      .leftJoinAndMapMany(
        'order.products',
        'order_products',
        'orderProduct',
        'order.id=orderProduct.orderId',
      )
      .getMany() as Promise<TableCategory[]>;
  }

  async getTablesByStatus(status: string): Promise<RestroTables[]> {
    return (
      await this.connectionService.getRepository(RestroTables, this.tenantId)
    ).find({
      relations: ['order'],
    });
  }

  async updateStatus(id: string): Promise<RestroTables> {
    const table = await (
      await this.connectionService.getRepository(RestroTables, this.tenantId)
    ).findOneBy({
      id,
    });
    const status: any = {
      [TableStatus.VACCAN]: [TableStatus.OCCUPIED],
      [TableStatus.OCCUPIED]: [TableStatus.ORDER_TAKEN],
      [TableStatus.ORDER_TAKEN]: [TableStatus.ORDERD_SERVER],
    };
    return (
      await this.connectionService.getRepository(RestroTables, this.tenantId)
    ).save({
      ...RestroTables,
      type: status[table.type],
    });
  }
}
