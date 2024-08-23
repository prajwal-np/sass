import { ApiProperty } from '@nestjs/swagger';
import { CreateTable } from './create.dto';

export class UpdateTable extends CreateTable {
  @ApiProperty()
  id: string;
  @ApiProperty()
  order: string[];
}
