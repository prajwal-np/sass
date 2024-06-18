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
    ]),
    AuthModule,
    CategoryModule,
    ProductModule,
    OrderModule,
    DeviceModule,
    ReportModule,
    ConnectionModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}
