import { Module } from '@nestjs/common';
import { TableService } from './tableManagement.service';
import { TableManagementController } from './tableManagement.controller';
import { ConnectionService } from '../connection/connection.service';
import { OrderService } from '../order/order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Table } from 'src/entity/tables.entity';
import { Repository } from 'typeorm';
import { TableCategory } from 'src/entity/tableCategoy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Table, TableCategory])],
  providers: [TableService, ConnectionService, OrderService, Repository],
  controllers: [TableManagementController],
})
export class TableManagementModule {}
