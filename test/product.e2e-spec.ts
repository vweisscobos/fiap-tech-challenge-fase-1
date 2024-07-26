import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { ApiCustomerModule } from "src/adapters/driver/api/customer/api.customer.module";
import * as request from 'supertest';
import { PrismaClient } from '@prisma/client'
import { MongoMemoryReplSet } from 'mongodb-memory-server-core';
import { PrismaService } from "src/adapters/driven/persistence/prisma.service";
import { ApiProductModule } from "src/adapters/driver/api/product/api.product.module";
import { ProductCategoryValue } from "src/core/domain/value-objects/product-category";

describe('Product', () => {
  let app: INestApplication;
  let mongod: MongoMemoryReplSet;
  let prisma: PrismaClient;

  const product1 = {
    name: 'Product 1',
    price: 10,
    description: 'Product 1 description',
    category: ProductCategoryValue.Food
  }

  const product2 = {
    name: 'Product 2',
    price: 20,
    description: 'Product 2 description',
    category: ProductCategoryValue.Dessert
  }

  const product3 = {
    name: 'Product 3',
    price: 30,
    description: 'Product 3 description',
    category: ProductCategoryValue.Beverage
  }

  const product4 = {
    name: 'Product 4',
    price: 40,
    description: 'Product 4 description',
    category: ProductCategoryValue.Snack
  }

  beforeAll(async () => {
    // This will create an new instance of "MongoMemoryServer" and automatically start it
    mongod = await MongoMemoryReplSet.create({ replSet: { count: 2, dbName: 'test', name: 'test' } });

    const uri = mongod.getUri('test');

    prisma = new PrismaClient({
      datasourceUrl: uri
    });

    const moduleRef = await Test.createTestingModule({ 
      imports: [ApiProductModule]
    })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/POST product food`, async () => {
    const res = await request(app.getHttpServer())
      .post('/product')
      .send(product1)
      .expect(201)

    expect(res.body).toMatchObject({
      ...product1,
      id: expect.any(String),
    })
  });

  it('/POST product dessert', async () => {
    const res = await request(app.getHttpServer())
      .post('/product')
      .send(product2)
      .expect(201)

    expect(res.body).toMatchObject({
      ...product2,
      id: expect.any(String),
    })
  })

  it('/POST product beverage', async () => {
    const res = await request(app.getHttpServer())
      .post('/product')
      .send(product3)
      .expect(201)

    expect(res.body).toMatchObject({
      ...product3,
      id: expect.any(String),
    })
  })

  it('/POST product snack', async () => {
    const res = await request(app.getHttpServer())
      .post('/product')
      .send(product4)
      .expect(201)

    expect(res.body).toMatchObject({
      ...product4,
      id: expect.any(String),
    })
  })

  it(`/GET products food`, async () => {
    const res = await request(app.getHttpServer())
      .get('/product')
      .query({ category: ProductCategoryValue.Food })
      .expect(200)

    expect(res.body).toHaveLength(1)
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...product1,
          id: expect.any(String),
        })
      ])
    )
  });

  it(`/GET products dessert`, async () => {
    const res = await request(app.getHttpServer())
      .get('/product')
      .query({ category: ProductCategoryValue.Dessert })
      .expect(200)

    expect(res.body).toHaveLength(1)
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...product2,
          id: expect.any(String),
        })
      ])
    )
  })

  it(`/GET products beverage`, async () => {
    const res = await request(app.getHttpServer())
      .get('/product')
      .query({ category: ProductCategoryValue.Beverage })
      .expect(200)

    expect(res.body).toHaveLength(1)
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...product3,
          id: expect.any(String),
        })
      ])
    )
  })

  it('/GET products snack', async () => {
    const res = await request(app.getHttpServer())
      .get('/product')
      .query({ category: ProductCategoryValue.Snack })
      .expect(200)

    expect(res.body).toHaveLength(1)
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...product4,
          id: expect.any(String),
        })
      ])
    )
  })

  it(`/DELETE product`, async () => {
    const res = await request(app.getHttpServer())
      .get('/product')
      .query({ category: ProductCategoryValue.Snack });

    await request(app.getHttpServer())
      .delete(`/product/${res.body[0].id}`)
      .expect(204)
  });

  it(`/DELETE a non existent product`, async () => {
    const res = await request(app.getHttpServer())
      .get('/product')
      .query({ category: ProductCategoryValue.Food })
      .expect(200)

    await request(app.getHttpServer())
      .delete(`/product/${res.body[0].id}`)
      .expect(204)

    const error = await request(app.getHttpServer())
      .delete(`/product/${res.body[0].id}`)
      .expect(404)

    expect(error.body).toMatchObject({
      statusCode: 404,
      message: 'Product not found',
      error: 'Not Found'
    })
  })

  it('/PUT product', async () => {
    const res = await request(app.getHttpServer())
      .get('/product')
      .query({ category: ProductCategoryValue.Dessert })
      .expect(200)

    const updatedProduct = {
      name: 'Product 2 updated',
      price: 25,
      description: 'Product 2 updated description',
      category: ProductCategoryValue.Dessert
    }

    await request(app.getHttpServer())
      .put(`/product/${res.body[0].id}`)
      .send(updatedProduct)
      .expect(200)

    const updatedRes = await request(app.getHttpServer())
      .get(`/product`)
      .query({ category: ProductCategoryValue.Dessert })
      .expect(200)

    expect(updatedRes.body[0]).toMatchObject({
      ...updatedProduct,
      id: res.body[0].id,
    })
  })

  afterAll(async () => {
    await prisma.$disconnect();
    await mongod.stop();
    await app.close();
  });
})