import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { OrderModule } from './modules/order/order.module';
import { RouterModule } from '@nestjs/core';
import { DeviceModule } from './modules/device/device.module';
import { ReportModule } from './modules/report/report.module';
import { ConnectionModule } from './modules/connection/connection.module';
import { TenantMiddleware } from './modules/connection/tenant.middleware';
import { PusherModule } from 'nestjs-pusher';
import { PaginationService } from './service/pagination.service';
import { TableManagementModule } from './modules/tableManagement/tableManagement.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as orm from '../ormconfig';

const yourPusherOptions = {
  appId: '1819840',
  key: 'fecb164e11761bd38ca1',
  secret: '8823a1df5bf75832bea0',
  cluster: 'ap2',
};

const chunkingOptions = {
  limit: 4000, //4mb
  enabled: true,
};
@Module({
  imports: [
    RouterModule.register([
      {
        path: 'category',
        module: CategoryModule,
      },
      {
        path: 'auth',
        module: AuthModule,
      },
      {
        path: 'product',
        module: ProductModule,
      },
      {
        path: 'order',
        module: OrderModule,
      },
      {
        path: 'device',
        module: DeviceModule,
      },
      {
        path: 'report',
        module: ReportModule,
      },
      {
        path: 'table-mang',
        module: TableManagementModule,
      },
    ]),
    AuthModule,
    CategoryModule,
    ProductModule,
    OrderModule,
    DeviceModule,
    ReportModule,
    TableManagementModule,
    ConnectionModule.forRoot(),
    TypeOrmModule.forRoot(orm),
    PusherModule.forRoot(yourPusherOptions, chunkingOptions, true),
  ],
  controllers: [AppController],
  providers: [AppService, PaginationService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}
