import { Injectable } from '@nestjs/common';
import { OrderRepository } from 'src/core/application/ports/order.repository';
import { PrismaService } from '../prisma.service';
import { NotPersistedOrder } from 'src/core/domain/order';
import { OrderMapper } from './order.mapper';

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
  constructor(
    private prismaService: PrismaService,
    private orderMapper: OrderMapper
  ) {}

  async create(order: NotPersistedOrder) {
    const persistedOrder = await this.prismaService.order.create({
      data: this.orderMapper.toPersistence(order),
      include: { customer: true }
    });
    return this.orderMapper.fromPersistence(persistedOrder);
  }

  async findAll() {
    const persistedOrders = await this.prismaService.order.findMany({
      include: { customer: true }
    })
    return persistedOrders.map(p => this.orderMapper.fromPersistence(p))
  }
}
