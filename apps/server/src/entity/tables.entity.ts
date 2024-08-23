import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Order } from './order.entity';

import { TableCategory } from './tableCategoy.entity';
import { BaseEntity } from './base.entity';
import { TableOrder } from './tableOrder.entity';

export enum TableStatus {
  VACCAN = 'vaccant',
  OCCUPIED = 'occupied',
  BILLING = 'billing',
  ORDER_TAKEN = 'orderTaken',
  ORDERD_SERVER = 'orderServer',
}

export enum TableType {
  CIRCLE = 'circle',
  ROUNDED = 'rounded',
  SQUARE = 'square',
}
@Entity()
export class Table {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('enum', {
    enum: TableType,
  })
  type: TableType;

  @Column()
  name: string;

  @Column()
  remark?: string;
  @Column()
  capacity?: number;

  @ManyToOne(() => TableCategory, (rooms) => rooms.tables)
  @JoinColumn()
  category: TableCategory;

  @OneToMany(() => TableCategory, (rooms) => rooms.tables)
  @JoinColumn()
  orders: TableOrder[];
}
