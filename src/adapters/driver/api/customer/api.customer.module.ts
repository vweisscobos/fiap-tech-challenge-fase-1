import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { ApplicationCustomerModule } from 'src/core/application/services/customer/application.customer.module';

@Module({
  imports: [ApplicationCustomerModule],
  controllers: [CustomerController],
})
export class ApiCustomerModule {}
