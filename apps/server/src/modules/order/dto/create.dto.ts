import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from 'src/entity/order.entity';
import { OrderProducts } from 'src/entity/orderProduct.entity';

export class CreateOrder {
  @ApiProperty()
  totalAmount: number;
  @ApiProperty()
  subTotal: number;
  @ApiProperty()
  tax: number;
  @ApiProperty()
  paymentMethod: PaymentMethod;
  @ApiProperty({})
  products: {
    id: string;
    quantity: number;
    note: string;
  }[];

  @ApiProperty()
  remark: string;
}

export class IPlaceOrder {
  @ApiProperty()
  tableId: string;
  @ApiProperty()
  guests: number;
  @ApiProperty()
  order: CreateOrder;
}
