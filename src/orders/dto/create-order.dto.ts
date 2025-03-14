import { CreateProductDto } from 'src/products/dto/create-product.dto';

export class CreateOrderDto {
  produtos: CreateProductDto[];
  total_pedido: number;
  status: string;
}
