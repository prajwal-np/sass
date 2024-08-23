import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Order } from './order.entity';

@Entity()
export class Pro {
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
  name: string;

  @Column()
  price: number;

  @Column()
  image: string;

  @ManyToOne(() => Category, (cat) => cat.products)
  @JoinTable()
  category: Category;

  @ManyToMany(() => Order, (order) => order.products)
  order: Order[];
}
