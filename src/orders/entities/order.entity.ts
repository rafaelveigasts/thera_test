import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ProductEntity } from '../../products/entities/product.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => ProductEntity, { cascade: true })
  @JoinTable({
    name: 'orders_products',
    joinColumn: { name: 'order_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
  })
  produtos: ProductEntity[];

  @Column('float')
  total_pedido: number;

  @Column({
    enum: ['Pendente', 'Concluído', 'Cancelado'],
    default: 'Pendente',
  })
  status: string;
}
