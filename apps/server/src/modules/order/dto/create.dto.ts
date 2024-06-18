import { ApiProperty } from '@nestjs/swagger';

export class CreateOrder {
  @ApiProperty()
  totalAmount: number;
  @ApiProperty()
  subTotal: number;
  @ApiProperty()
  tax: number;
  @ApiProperty()
  paymentMethod: string;
  @ApiProperty({
    isArray: true,
    type: 'number',
  })
  product: number[];

  @ApiProperty()
  remark: string;
}
