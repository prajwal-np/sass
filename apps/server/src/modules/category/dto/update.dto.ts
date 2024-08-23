import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategory {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
}
