import { ApiProperty } from '@nestjs/swagger';

export class CreateProduct {
  @ApiProperty()
  name: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  image: string;
  @ApiProperty()
  category: number;
}
