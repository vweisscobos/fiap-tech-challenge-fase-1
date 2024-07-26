import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { PersistenceCustomerModule } from 'src/adapters/driven/persistence/customer/persistence.customer.module';

@Module({
  imports: [PersistenceCustomerModule],
  providers: [CustomerService],
  exports: [CustomerService]
})
export class ApplicationCustomerModule {}
