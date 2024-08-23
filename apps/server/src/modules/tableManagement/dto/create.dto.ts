import { ApiProperty } from '@nestjs/swagger';
import { TableStatus, TableType } from 'src/entity/tables.entity';

export class CreateTable {
  @ApiProperty({
    enum: TableType,
  })
  type: TableType;
  @ApiProperty()
  remark: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  category: string;
}

export class createRoom {
  @ApiProperty()
  name: string;
}
