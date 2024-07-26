import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { PersistenceProductModule } from 'src/adapters/driven/persistence/product/persistence.product.module';

@Module({
  imports: [PersistenceProductModule],
  providers: [ProductService],
  exports: [ProductService]
})
export class ApplicationProductModule {}
