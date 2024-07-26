import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ApplicationProductModule } from 'src/core/application/services/product/application.product.module';

@Module({
  imports: [ApplicationProductModule],
  controllers: [ProductController]
})
export class ApiProductModule {}
