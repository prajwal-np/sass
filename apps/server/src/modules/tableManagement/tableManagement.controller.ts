import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TableService } from './tableManagement.service';
import { CreateTable, createRoom, UpdateTable } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { Status } from 'src/entity/order.entity';

@ApiTags('Table Management')
@Controller()
export class TableManagementController {
  constructor(private readonly tableService: TableService) {}

  @Post('/category')
  createRoom(@Body() payload: createRoom) {
    return this.tableService.createRoom(payload);
  }

  @Post('/table')
  createTable(@Body() payload: CreateTable) {
    return this.tableService.createTable(payload);
  }

  @Put('')
  updateTable(@Body() payload: UpdateTable) {
    return this.tableService.updateTable(payload);
  }

  // @Get('/:id')
  // updateTableStatus(@Param() id: string) {
  //   return this.tableService.updateStatus(id);
  // }

  @Put('update_status/:id')
  updateStatus(@Param() payload: any) {
    return this.tableService.updateStatus(payload.id);
  }

  // @Get('/:status')
  // getTablesByStatus(@Param() payload: { status: Status }) {
  //   return this.tableService.getTablesByStatus(payload.status);
  // }

  @Get('/all')
  getAllTables() {
    return this.tableService.getAll();
  }
}
