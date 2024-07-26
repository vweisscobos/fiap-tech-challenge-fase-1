import { Customer, NotPersistedCustomer } from "src/core/domain/customer";

export abstract class CustomerRepository {
  abstract create(customer: NotPersistedCustomer): Promise<Customer>;
  abstract findByEmailAndDocument(email: string, document: string): Promise<Customer | null>;
  abstract findByID(id: string): Promise<Customer | null>;
}