import { Module } from '@nestjs/common';
import { CustomerRepository } from 'src/core/application/ports/customer.repository';
import { PrismaCustomerRepository } from './customer.repository';
import { CustomerMapper } from './customer.mapper';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [
    PrismaService,
    {
      provide: CustomerRepository,
      useClass: PrismaCustomerRepository
    },
    CustomerMapper
  ],
  exports: [CustomerRepository]
})
export class PersistenceCustomerModule {}
