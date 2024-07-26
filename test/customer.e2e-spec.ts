import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { ApiCustomerModule } from "src/adapters/driver/api/customer/api.customer.module";
import * as request from 'supertest';
import { PrismaClient } from '@prisma/client'
import { MongoMemoryReplSet } from 'mongodb-memory-server-core';
import { PrismaService } from "src/adapters/driven/persistence/prisma.service";

describe('Customer', () => {
  let app: INestApplication;
  let mongod: MongoMemoryReplSet;
  let prisma: PrismaClient;

  const user1 = {
    name: 'User 1',
    email: 'user1@email.com',
    document: '12345678901'
  }

  beforeAll(async () => {
    // This will create an new instance of "MongoMemoryServer" and automatically start it
    mongod = await MongoMemoryReplSet.create({ replSet: { count: 2, dbName: 'test', name: 'test' } });

    const uri = mongod.getUri('test');

    prisma = new PrismaClient({
      datasourceUrl: uri
    });

    const moduleRef = await Test.createTestingModule({ 
      imports: [ApiCustomerModule]
    })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/POST customer`, async () => {
    const res = await request(app.getHttpServer())
      .post('/customer')
      .send(user1)
      .expect(201)

    expect(res.body).toMatchObject({
      ...user1,
      id: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
    })
  });

  it(`/GET login`, async () => {
    const res = await request(app.getHttpServer())
      .post('/customer/login')
      .send({
        email: user1.email,
        document: user1.document
      })
      .expect(200)

    expect(res.body).toMatchObject({
      ...user1,
      id: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
    })
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await mongod.stop();
    await app.close();
  });
})