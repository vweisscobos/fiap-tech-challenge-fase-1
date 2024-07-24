import { Test, TestingModule } from '@nestjs/testing';
import { PrismaOrderRepository } from './order.repository';
import { PrismaService } from '../prisma.service';
import { OrderMapper } from './order.mapper';
import { CustomerMapper } from '../customer/customer.mapper';

describe('PrismaOrderRepository', () => {
  let service: PrismaOrderRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaOrderRepository,
        PrismaService,
        OrderMapper,
        CustomerMapper
      ],
    }).compile();

    service = module.get<PrismaOrderRepository>(PrismaOrderRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
