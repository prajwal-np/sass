import { Injectable } from '@nestjs/common';
import { Admin } from 'src/entity/admin.entity';
import { Category } from 'src/entity/category.entity';
import { Device } from 'src/entity/device.entity';
import { Order } from 'src/entity/order.entity';
import { Product } from 'src/entity/product.entity';
import { User } from 'src/entity/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

@Injectable()
export class ConnectionService {
  private connections: Map<string, DataSource> = new Map();

  private createDataSourceOptions(tenantId: string): DataSourceOptions {
    return {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: `db_${tenantId}`,
      entities: [Category, Product, User, Order, Device],
    };
  }

  async getDataSource(tenantId: string): Promise<DataSource> {
    if (!this.connections.has(tenantId)) {
      const dataSource = new DataSource(this.createDataSourceOptions(tenantId));
      await dataSource.initialize();
      // await dataSource.synchronize();
      this.connections.set(tenantId, dataSource);
    }
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

  async getAdminDataSource(): Promise<DataSource> {
    const adminConnection: Map<string, DataSource> = new Map();
    const dataSource = new DataSource(this.createAdminDataSourceOptions());
    await dataSource.initialize();
    // await dataSource.synchronize();
    adminConnection.set('cosmic_lab', dataSource);
    return adminConnection.get('cosmic_lab');
  }

  async createTenantDatabase(tenantId: string): Promise<void> {
    const adminDataSource = new DataSource(this.createAdminDataSourceOptions());

    await adminDataSource.initialize();

    await adminDataSource.query(`CREATE DATABASE db_${tenantId}`);
    await adminDataSource.destroy();
    // Initialize tenant's data source to run migrations or synchronize schema
    const dataSource = new DataSource(this.createDataSourceOptions(tenantId));
    await dataSource.initialize();
    // Synchronize schema
    await dataSource.synchronize();
    // Or run migrations if you prefer
    // await dataSource.runMigrations();

    this.connections.set(tenantId, dataSource);
  }
}
