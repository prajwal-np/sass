import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { ConnectionService } from '../connection/connection.service';

@Module({
  imports: [],
  providers: [CategoryService, ConnectionService],
  controllers: [CategoryController],
})
export class CategoryModule {}
