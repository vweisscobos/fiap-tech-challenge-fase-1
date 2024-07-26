import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { ApplicationOrderModule } from 'src/core/application/services/order/application.order.module';

@Module({
  imports: [ApplicationOrderModule],
  controllers: [OrderController],
})
export class ApiOrderModule {}
