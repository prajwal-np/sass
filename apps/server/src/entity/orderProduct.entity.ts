import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Products } from './product.entity';

@Entity()
export class OrderProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  public created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  public updated_at: Date;

  @Column()
  quantity: number;

  @Column()
  note: string;

  @ManyToOne(() => Products, (order) => order.productOrder)
  @JoinColumn()
  product: Products;

  @ManyToOne(() => Order, (order) => order.products)
  @JoinColumn()
  order: Order;
}
