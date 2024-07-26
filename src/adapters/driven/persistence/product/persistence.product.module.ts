import { Module } from '@nestjs/common';
import { ProductRepository } from 'src/core/application/ports/product.repository';
import { PrismaProductRepository } from './product.repository';
import { PrismaService } from '../prisma.service';
import { ProductMapper } from './product.mapper';

@Module({
  providers: [
    {
      provide: ProductRepository,
      useClass: PrismaProductRepository
    },
    PrismaService,
    ProductMapper
  ],
  exports: [ProductRepository]
})
export class PersistenceProductModule {}
