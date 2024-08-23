import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Table } from './tables.entity';
import { Order } from './order.entity';

export enum TableOrderStatus {
  VACCAN = 'vaccant',
  OCCUPIED = 'occupied',
  BILLING = 'billing',
  ORDER_TAKEN = 'orderTaken',
  ORDERD_SERVER = 'orderServer',
  UNPAID = 'unpaid',
  COMPLETED = 'completed',
}

@Entity()
export class TableOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('enum', {
    enum: TableOrderStatus,
  })
  status: TableOrderStatus;

  @Column()
  guests?: number;

  @ManyToOne(() => Table, (rooms) => rooms.orders)
  @JoinColumn()
  table: Table;

  @OneToMany(() => Order, (order) => order.tableOrder)
  order: Order[];
}
