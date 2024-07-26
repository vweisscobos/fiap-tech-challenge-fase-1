import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { CustomerRepository } from '../../ports/customer.repository';
import { ProductRepository } from '../../ports/product.repository';
import { OrderRepository } from '../../ports/order.repository';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: OrderRepository,
          useValue: {}
        },
        {
          provide: ProductRepository,
          useValue: {}
        },
        {
          provide: CustomerRepository,
          useValue: {}
        }
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
