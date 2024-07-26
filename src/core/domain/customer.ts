import { Entity, NotPersistedEntity, PersistedEntity } from "./entity";

export class _Customer<T extends PersistedEntity | NotPersistedEntity> extends Entity<T> {
  name: string;
  email: string;
  document: string;

  constructor(customer: { name: string; email: string; document: string } & T) {
    super(customer);
    this.name = customer.name;
    this.email = customer.email;
    this.document = customer.document;
  }
}

export class Customer extends _Customer<PersistedEntity> {}

export class NotPersistedCustomer extends _Customer<NotPersistedEntity> {}

