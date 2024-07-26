import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../../ports/product.repository';
import { ProductCategoryValue } from 'src/core/domain/value-objects/product-category';
import { CreateProductDto } from './dtos/create-product.dto';
import { NotPersistedProduct } from 'src/core/domain/product';
import { ProductDto } from './dtos/product.dto';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async findByCategory(category: ProductCategoryValue) {
    const products = await this.productRepository.findByCategory(category);
    return products.map(product => new ProductDto(product));
  }

  async create(product: CreateProductDto) {
    const newProduct = new NotPersistedProduct(product);
    return new ProductDto(await this.productRepository.create(newProduct));
  }

  async delete(id: string) {
    return await this.productRepository.delete(id);
  }

  async update(id: string, product: CreateProductDto) {
    const persistedProduct = await this.productRepository.find(id);
    if (!persistedProduct) throw new NotFoundException('Product not found');
    persistedProduct.update(product);
    return new ProductDto(await this.productRepository.update(id, persistedProduct));
  }
}
