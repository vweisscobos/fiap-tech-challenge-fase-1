import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from 'supertest';
import { PrismaClient } from '@prisma/client'
import { MongoMemoryReplSet } from 'mongodb-memory-server-core';
import { PrismaService } from "src/adapters/driven/persistence/prisma.service";
import { seedProducts, seedCustomers } from "./seeds";
import { ProductRepository } from "src/core/application/ports/product.repository";
import { Product } from "src/core/domain/product";
import { CustomerRepository } from "src/core/application/ports/customer.repository";
import { Customer } from "src/core/domain/customer";
import { OrderStatusValue } from "src/core/domain/value-objects/order-status";
import { ApplicationProductModule } from "src/core/application/services/product/application.product.module";
import { ApiOrderModule } from "src/adapters/driver/api/order/api.order.module";

describe('Customer', () => {
  let app: INestApplication;
  let mongod: MongoMemoryReplSet;
  let prisma: PrismaClient;
  let persistedProducts: Product[];
  let persistedCustomers: Customer[];

  beforeAll(async () => {
    // This will create an new instance of "MongoMemoryServer" and automatically start it
    mongod = await MongoMemoryReplSet.create({ replSet: { count: 2, dbName: 'test', name: 'test' } });

    const uri = mongod.getUri('test');

    prisma = new PrismaClient({
      datasourceUrl: uri
    });

    const moduleRef = await Test.createTestingModule({ 
      imports: [ApplicationProductModule, ApiOrderModule]
    })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile();

    app = moduleRef.createNestApplication();
    const productRepository = moduleRef.get<ProductRepository>(ProductRepository);
    const customerRepository = moduleRef.get<CustomerRepository>(CustomerRepository);
    await app.init();

    persistedProducts = await seedProducts(productRepository);
    persistedCustomers = await seedCustomers(customerRepository);
  });

  it(`/POST order identifying user`, async () => {
    const res = await request(app.getHttpServer())
      .post('/order')
      .send({
        customerId: persistedCustomers[0].id,
        products: persistedProducts.map(product => ({ id: product.id, quantity: 1 }))
      })
      .expect(201)

    expect(res.body).toMatchObject({
      customer: {
        name: persistedCustomers[0].name,
        email: persistedCustomers[0].email,
        document: persistedCustomers[0].document
      },
      products: persistedProducts.map(p => ({
        name: p.name,
        price: p.price,
        quantity: 1,
        description: p.description,
        category: p.category.getValue()
      })),
      total: persistedProducts.reduce((acc, product) => acc + product.price, 0),
      status: OrderStatusValue.Received,
      id: expect.any(String),
    })
  });

  it(`/POST order without identifying user`, async () => {
    const res = await request(app.getHttpServer())
      .post('/order')
      .send({
        products: persistedProducts.map(product => ({ id: product.id, quantity: 1 }))
      })
      .expect(201)

    expect(res.body).toMatchObject({
      customer: null,
      products: persistedProducts.map(p => ({
        name: p.name,
        price: p.price,
        quantity: 1,
        description: p.description,
        category: p.category.getValue()
      })),
      total: persistedProducts.reduce((acc, product) => acc + product.price, 0),
      status: OrderStatusValue.Received,
      id: expect.any(String),
    })
  });

  it(`/GET order`, async () => {
    const res = await request(app.getHttpServer())
      .get('/order')
      .expect(200)

    expect(res.body.length).toBe(2);
    expect(res.body[0]).toMatchObject({
      customer: {
        name: persistedCustomers[0].name,
        email: persistedCustomers[0].email,
        document: persistedCustomers[0].document
      },
      products: persistedProducts.map(p => ({
        name: p.name,
        price: p.price,
        quantity: 1,
        description: p.description,
        category: p.category.getValue()
      })),
      total: persistedProducts.reduce((acc, product) => acc + product.price, 0),
      status: OrderStatusValue.Received,
      id: expect.any(String),
    })
    expect(res.body[1]).toMatchObject({
      customer: null,
      products: persistedProducts.map(p => ({
        name: p.name,
        price: p.price,
        quantity: 1,
        description: p.description,
        category: p.category.getValue()
      })),
      total: persistedProducts.reduce((acc, product) => acc + product.price, 0),
      status: OrderStatusValue.Received,
      id: expect.any(String),
    })
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await mongod.stop();
    await app.close();
  });
})