import { Inject, Injectable } from '@nestjs/common';
import { Admin } from 'src/entity/admin.entity';
import { Category } from 'src/entity/category.entity';
import { Devices } from 'src/entity/devices.entity';
import { Order } from 'src/entity/order.entity';
import { Pro } from 'src/entity/pro.entity';
import { Products } from 'src/entity/product.entity';
import { TableCategory } from 'src/entity/tableCategoy.entity';
import { Table } from 'src/entity/tables.entity';
import { User } from 'src/entity/user.entity';
import {
  DataSource,
  DataSourceOptions,
  EntityTarget,
  Repository,
} from 'typeorm';
import { CONNECTION } from './connection.module';
import { TableOrder } from 'src/entity/tableOrder.entity';
import { OrderProducts } from 'src/entity/orderProduct.entity';

export function getTenantConnection(tenantId: string): DataSourceOptions {
  return {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: 'password',
    database: 'cosmic_lab',
    schema: tenantId,
    // logging: true,
    autoLoadEntities: true,
    entities: [
      User,
      Table,
      Order,
      TableCategory,
      Devices,
      Products,
      Category,
      TableOrder,
      OrderProducts,
    ],
    synchronize: true,
    cache: true,
  } as DataSourceOptions;
}

@Injectable()
export class ConnectionService {
  private connections: Map<string, DataSource> = new Map();

  constructor(
    @Inject(CONNECTION)
    private dataSources: DataSource,
  ) {}

  async getDataSource(tenantId: string): Promise<DataSource> {
    if (!this.connections.has(tenantId)) {
      const dataSource = new DataSource(getTenantConnection(tenantId));
      await dataSource.initialize();
      this.connections.set(tenantId, dataSource);
      return dataSource;
    }
    await this.connections.get(tenantId).synchronize();
    return this.connections.get(tenantId);
  }

  private createAdminDataSourceOptions(): DataSourceOptions {
    return {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'cosmic_lab',
      entities: [Admin],
    };
  }

  async getRepository<T>(
    entity: EntityTarget<T>,
    tenantId: string,
  ): Promise<Repository<T>> {
    console.log(tenantId);
    const dataSource = await this.getDataSource(tenantId);
    const repo = dataSource.getRepository(entity);
    return repo;
  }

  async getAdminDataSource(): Promise<DataSource> {
    const adminConnection: Map<string, DataSource> = new Map();
    const dataSource = new DataSource(this.createAdminDataSourceOptions());
    await dataSource.initialize();

    adminConnection.set('cosmic_lab', dataSource);
    await dataSource.synchronize();
    return adminConnection.get('cosmic_lab');
  }

  async createTenantDatabase(tenantId: string): Promise<void> {
    const adminDataSource = new DataSource(this.createAdminDataSourceOptions());

    await adminDataSource.initialize();
    const table = `CREATE DATABASE db_${tenantId}`;
    await adminDataSource.query(table);

    await adminDataSource.destroy();
    // Initialize tenant's data source to run migrations or synchronize schema
    const dataSource = new DataSource(getTenantConnection(tenantId));
    await dataSource.initialize();
    // Synchronize schema
    await dataSource.synchronize();
    // Or run migrations if you prefer
    // await dataSource.runMigrations();

    this.connections.set(tenantId, dataSource);
  }
}
