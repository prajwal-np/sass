import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Order } from './order.entity';
import { OrderProducts } from './orderProduct.entity';

@Entity()
export class Products {
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
  @JoinColumn()
  category: Category;

  @OneToMany(() => OrderProducts, (order) => order.product)
  productOrder: OrderProducts[];
}
