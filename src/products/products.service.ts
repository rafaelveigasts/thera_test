import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productsRepository: Repository<ProductEntity>,
  ) {}

  create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    return this.productsRepository.save(createProductDto);
  }

  findAll(): Promise<ProductEntity[]> {
    return this.productsRepository.find();
  }

  findOne(id: number): Promise<ProductEntity> {
    return this.productsRepository.findOneBy({ id });
  }

  findByIds(ids: number[]): Promise<ProductEntity[]> {
    return this.productsRepository.findBy({ id: In(ids) });
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    await this.productsRepository.update(id, updateProductDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.productsRepository.delete(id);
  }
}
