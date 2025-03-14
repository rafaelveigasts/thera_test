import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductEntity } from './entities/product.entity';

@Controller('/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(): Promise<ProductEntity[]> {
    return this.productsService.findAll();
  }

  @Post()
  create(@Body() productData: ProductEntity): Promise<ProductEntity> {
    return this.productsService.create(productData);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() productData: ProductEntity,
  ): Promise<ProductEntity> {
    return this.productsService.update(id, productData);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.productsService.remove(id);
  }
}
