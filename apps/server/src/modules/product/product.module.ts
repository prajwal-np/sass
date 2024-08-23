import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ConnectionService } from '../connection/connection.service';

@Module({
  imports: [],
  providers: [ProductService, ConnectionService],
  controllers: [ProductController],
})
export class ProductModule {}
