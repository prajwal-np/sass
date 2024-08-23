import { ApiProperty } from '@nestjs/swagger';

export class CreateDevice {
  @ApiProperty()
  paringCode: number;
}
