import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { GlobalTexts } from 'src/data/constants/texts';
import { HttpExceptionService } from 'src/data/services/http-exception/http-exception.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService, HttpExceptionService, GlobalTexts],
  exports: [TypeOrmModule],
})
export class ProductsModule {}
