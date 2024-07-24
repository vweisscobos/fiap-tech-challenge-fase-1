import { Test, TestingModule } from '@nestjs/testing';
import { PrismaProductRepository } from './product.repository';
import { PrismaService } from '../prisma.service';
import { ProductMapper } from './product.mapper';

describe('ProductRepository', () => {
  let Repository: PrismaProductRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaProductRepository, PrismaService, ProductMapper],
    }).compile();

    Repository = module.get<PrismaProductRepository>(PrismaProductRepository);
  });

  it('should be defined', () => {
    expect(Repository).toBeDefined();
  });
});
