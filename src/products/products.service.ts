import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { GlobalTexts } from 'src/data/constants/texts';
import { HttpExceptionService } from 'src/data/services/http-exception/http-exception.service';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private readonly product: Repository<Product>,
    public globalTexts: GlobalTexts,
    public httpExceptionService: HttpExceptionService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const productExists = await this.product.findOne({
      where: { name: createProductDto.name },
    });
    try {
      if (productExists) {
        this.logger.error(this.globalTexts.existingElement, '');
        this.httpExceptionService.httpException(
          this.globalTexts.existingElement,
          HttpStatus.CONFLICT,
        );
      } else {
        await this.product.save(createProductDto);
        return { response: this.globalTexts.elementCreatedSuccessfully };
      }
    } catch (error) {
      this.logger.error(this.globalTexts.anErrorOccurred, error.stack);
      this.httpExceptionService.httpException(
        error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAll() {
    try {
      return await this.product.find();
    } catch (error) {
      this.logger.error(this.globalTexts.anErrorOccurred, error.stack);
      this.httpExceptionService.httpException(
        error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: any) {
    const products = await this.product.findOne({
      where: { id: id },
    });
    console.log(id);

    try {
      if (!products) {
        this.logger.error(this.globalTexts.idDoesNotExist, '');
        this.httpExceptionService.httpException(
          this.globalTexts.idDoesNotExist,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return products;
      }
    } catch (error) {
      this.logger.error(this.globalTexts.anErrorOccurred, error.stack);
      this.httpExceptionService.httpException(
        error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(updateProductDto: UpdateProductDto) {
    await this.findOne(updateProductDto.id);
    try {
      const products = await this.product.findOne({
        where: [{ name: updateProductDto.name }],
      });
      if (products && products.id !== updateProductDto.id) {
        console.log('error');

        this.logger.error(this.globalTexts.existingElement, '');
        this.httpExceptionService.httpException(
          this.globalTexts.existingElement,
          HttpStatus.CONFLICT,
        );
      }
      await this.product.update(updateProductDto.id, updateProductDto);
      return { response: this.globalTexts.updateSuccessful };
    } catch (error) {
      this.logger.error(this.globalTexts.anErrorOccurred, error.stack);
      this.httpExceptionService.httpException(
        error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(id: any) {
    await this.findOne(id);
    try {
      await this.product.delete(id);
      return { response: this.globalTexts.removalSuccessful };
    } catch (error) {
      this.logger.error(this.globalTexts.anErrorOccurred, error.stack);
      this.httpExceptionService.httpException(
        error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
