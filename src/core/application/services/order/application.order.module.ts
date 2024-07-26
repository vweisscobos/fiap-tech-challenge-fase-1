import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { PersistenceOrderModule } from 'src/adapters/driven/persistence/order/persistence.order.module';
import { PersistenceProductModule } from 'src/adapters/driven/persistence/product/persistence.product.module';
import { PersistenceCustomerModule } from 'src/adapters/driven/persistence/customer/persistence.customer.module';

@Module({
  imports: [PersistenceOrderModule, PersistenceProductModule, PersistenceCustomerModule],
  providers: [OrderService],
  exports: [OrderService]
})
export class ApplicationOrderModule {}
