import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pro } from './pro.entity';
import { TableOrder } from './tableOrder.entity';
import { Products } from './product.entity';
import { OrderProducts } from './orderProduct.entity';
// import { RestroTables } from './tables.entity';

export enum PaymentMethod {
  CASH = 'cash',
  CARD = 'card',
  ONLINE = 'online',
}

export enum Status {
  INCOMING = 'pending',
  PROCESSING = 'processing',
  DELIVERED = 'delivered',
  COMPLETED = 'completed',
}
@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('enum', {
    enum: Status,
  })
  status: Status;

  @OneToMany(() => OrderProducts, (prod) => prod.order)
  @JoinColumn()
  products: OrderProducts[];

  @Column()
  totalAmount: number;

  @Column()
  subTotal: number;

  @Column()
  tax: number;

  @Column('enum', {
    enum: PaymentMethod,
  })
  paymentMethod: PaymentMethod;

  @ManyToOne(() => TableOrder, (table) => table.order)
  @JoinColumn()
  tableOrder: TableOrder;

  @Column()
  remark?: string;

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
}
