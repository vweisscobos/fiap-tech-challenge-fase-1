import { Test, TestingModule } from '@nestjs/testing';
import { PrismaCustomerRepository } from '../customer/customer.repository';
import { PrismaService } from '../prisma.service';
import { CustomerMapper } from './customer.mapper';

describe('CustomerRepository', () => {
  let Repository: PrismaCustomerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaCustomerRepository, PrismaService, CustomerMapper],
    }).compile();

    Repository = module.get<PrismaCustomerRepository>(PrismaCustomerRepository);
  });

  it('should be defined', () => {
    expect(Repository).toBeDefined();
  });
});
