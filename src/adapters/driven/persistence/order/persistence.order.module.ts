import { Module } from '@nestjs/common';
import { OrderRepository } from 'src/core/application/ports/order.repository';
import { PrismaOrderRepository } from './order.repository';
import { PrismaService } from '../prisma.service';
import { CustomerMapper } from '../customer/customer.mapper';
import { OrderMapper } from './order.mapper';

@Module({
  providers: [
    OrderMapper,
    CustomerMapper,
    PrismaService,
    {
      provide: OrderRepository,
      useClass: PrismaOrderRepository
    },
  ],
  exports: [OrderRepository]
})
export class PersistenceOrderModule {}
