import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './adapters/driver/api/api.module';
import { ApplicationOrderModule } from './core/application/services/order/application.order.module';
import { ApplicationProductModule } from './core/application/services/product/application.product.module';
import { ApplicationCustomerModule } from './core/application/services/customer/application.customer.module';
import { PersistenceOrderModule } from './adapters/driven/persistence/order/persistence.order.module';
import { PersistenceProductModule } from './adapters/driven/persistence/product/persistence.product.module';
import { PersistenceCustomerModule } from './adapters/driven/persistence/customer/persistence.customer.module';

@Module({
  imports: [
    ApiModule,
    ApplicationCustomerModule,
    ApplicationOrderModule,
    ApplicationProductModule,
    PersistenceOrderModule,
    PersistenceProductModule,
    PersistenceCustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
