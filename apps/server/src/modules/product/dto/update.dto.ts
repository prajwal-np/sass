import { ApiProperty } from '@nestjs/swagger';
import { CreateProduct } from './create.dto';

export class UpdateProduct extends CreateProduct {
  @ApiProperty()
  id: string;
}
