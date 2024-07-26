import { Customer } from "./customer";
import { Entity, NotPersistedEntity, PersistedEntity } from "./entity";
import { OrderStatus, OrderStatusValue } from "./value-objects/order-status";
import { ProductCategory } from "./value-objects/product-category";

type OrderProduct = {
  name: string;
  price: number;
  description: string;
  category: ProductCategory;
  quantity: number;
}

class _Order<T extends PersistedEntity | NotPersistedEntity = PersistedEntity> extends Entity<T> {
  customer: Customer | null;
  products: OrderProduct[];
  total: number;
  status: OrderStatus;

  constructor(order: { customer: Customer | null; products: OrderProduct[]; status: OrderStatusValue; total: number } & T) {
    super(order);
    this.customer = order.customer;
    this.products = order.products;
    this.total = order.total;
    this.status = new OrderStatus(order.status);
  }
}

export class Order extends _Order<PersistedEntity> {}

export class NotPersistedOrder extends _Order<NotPersistedEntity> {}