import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern('create_products')
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @MessagePattern('list_products')
  findAll() {
    return this.productsService.findAll();
  }

  @MessagePattern('list_products_id')
  findOne(@Payload() id: any) {
    return this.productsService.findOne(id);
  }

  @MessagePattern('update_product')
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productsService.update(updateProductDto);
  }

  @MessagePattern('delete_product')
  remove(@Payload() id: any) {
    return this.productsService.remove(id);
  }
}
