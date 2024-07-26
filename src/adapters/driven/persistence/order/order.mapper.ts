import { Prisma, Order as PrismaOrder } from "@prisma/client"
import { ProductCategory, ProductCategoryValue } from "src/core/domain/value-objects/product-category";
import { NotPersistedOrder, Order } from "src/core/domain/order";
import { OrderStatusValue } from "src/core/domain/value-objects/order-status";
import { Injectable } from "@nestjs/common";
import { CustomerMapper } from "../customer/customer.mapper";

const orderWithCustomer = Prisma.validator<Prisma.OrderDefaultArgs>()({
	include: {
		customer: true,
	},
})

export type PrismaOrderWithCustomer = Prisma.OrderGetPayload<typeof orderWithCustomer>

@Injectable()
export class OrderMapper {
  constructor(private customerMapper: CustomerMapper) {}

  toPersistence(order: Order | NotPersistedOrder) {
    return {
      customerId: order.customer?.id || null,
      products: order.products.map(product => ({
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        description: product.description,
        category: product.category.getValue()
      })),
      total: order.total,
      status: order.status.getValue()
    }
  }

  fromPersistence(order: PrismaOrderWithCustomer) {
    return new Order({
      id: order.id,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      customer: order.customer ? this.customerMapper.fromPersistence(order.customer) : null,
      products: order.products.map(product => ({
        ...product,
        category: new ProductCategory(ProductCategoryValue[product.category])
      })),
      total: order.total,
      status: OrderStatusValue[order.status]
    })
  }
}