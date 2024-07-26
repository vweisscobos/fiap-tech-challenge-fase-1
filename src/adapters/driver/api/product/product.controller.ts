import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ProductCategoryValue } from 'src/core/domain/value-objects/product-category';
import { ProductService } from 'src/core/application/services/product/product.service';
import { NotFoundError } from 'src/core/application/errors/not-found.error';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @Get()
  @HttpCode(200)
  @ApiQuery({ name: 'category', enum: ProductCategoryValue })
  async find(@Query('category') category: ProductCategoryValue) {
    return await this.productService.findByCategory(category);
  }

  @Delete('/:id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    try {
      await this.productService.delete(id);
    } catch (error) {
      if (error instanceof NotFoundError) throw new NotFoundException('Product not found');
    }
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() updateProductDto: CreateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

}
