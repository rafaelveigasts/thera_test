import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { OrderEntity } from './entities/order.entity';
import { ProductEntity } from '../products/entities/product.entity';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private ordersRepository: Repository<OrderEntity>,

    @InjectRepository(ProductEntity)
    private productsRepository: Repository<ProductEntity>,
  ) {}

  findAll(): Promise<OrderEntity[]> {
    return this.ordersRepository.find({ relations: ['produtos'] });
  }

  async create(data: any): Promise<OrderEntity> {
    const produtos = await this.productsRepository.findBy({
      id: In(data.produtos.map((p) => p.id)),
    });
    const total_pedido = produtos.reduce(
      (sum, p) =>
        sum +
        p.preco * (data.produtos.find((dp) => dp.id === p.id)?.quantidade || 0),
      0,
    );

    const newOrder = this.ordersRepository.create({
      produtos,
      total_pedido,
      status: 'Pendente',
    });

    return this.ordersRepository.save(newOrder);
  }

  async findOne(id: number): Promise<OrderEntity> {
    return this.ordersRepository.findOne({
      where: { id },
      relations: ['produtos'],
    });
  }

  async update(id: number, data: UpdateOrderDto): Promise<OrderEntity> {
    await this.ordersRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.ordersRepository.delete(id);
  }
}
