import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from 'src/core/application/services/order/order.service';
import { OrderRepository } from 'src/core/application/ports/order.repository';
import { CustomerRepository } from 'src/core/application/ports/customer.repository';
import { ProductRepository } from 'src/core/application/ports/product.repository';

describe('OrderController', () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        OrderService,
        {
          provide: OrderRepository,
          useValue: {},
        },
        {
          provide: CustomerRepository,
          useValue: {},
        },
        {
          provide: ProductRepository,
          useValue: {},
        }
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
