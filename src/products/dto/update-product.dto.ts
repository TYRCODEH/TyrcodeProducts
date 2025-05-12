import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsInt, IsString } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  id?: any;

  @IsString()
  name: string;

  @IsInt()
  price: number;

  @IsString()
  userid: string;
}
