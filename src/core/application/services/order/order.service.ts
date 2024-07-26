import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../ports/order.repository';
import { CreateOrderDto } from './dtos/create-order.dto';
import { NotPersistedOrder } from 'src/core/domain/order';
import { ProductRepository } from '../../ports/product.repository';
import { OrderStatusValue } from 'src/core/domain/value-objects/order-status';
import * as _ from 'lodash';
import { OrderDto } from './dtos/order.dto';
import { CustomerRepository } from '../../ports/customer.repository';

@Injectable()
export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private productRepository: ProductRepository,
    private customerRepository: CustomerRepository
  ) {}

  async createOrder(order: CreateOrderDto) {
    const products = await this.productRepository.findByIDs(order.products.map(p => p.id));
    const indexedProducts = _.keyBy(products, 'id');
    const newOrder = new NotPersistedOrder({
      ...order,
      customer: order.customerId
        ? await this.customerRepository.findByID(order.customerId)
        : null,
      products: order.products.map(p => ({ ...p, ...indexedProducts[p.id] })),
      status: OrderStatusValue.Received,
      total: products.reduce((acc, p) => acc + p.price, 0),
    });
    const persistedOrder = await this.orderRepository.create(newOrder);
    return new OrderDto(persistedOrder);
  }

  async findAll() {
    const orders = await this.orderRepository.findAll();
    return orders.map(o => new OrderDto(o));
  }
}
