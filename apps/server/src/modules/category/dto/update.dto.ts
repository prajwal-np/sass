import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategory {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}
