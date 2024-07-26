import { Module } from '@nestjs/common';
import { ApiOrderModule } from './order/api.order.module';
import { ApiCustomerModule } from './customer/api.customer.module';
import { ApiProductModule } from './product/api.product.module';

@Module({
  imports: [ApiOrderModule, ApiCustomerModule, ApiProductModule]
})
export class ApiModule {}
