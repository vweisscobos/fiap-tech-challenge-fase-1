import { CustomerRepository } from "src/core/application/ports/customer.repository";
import { Customer, NotPersistedCustomer } from "src/core/domain/customer";

const customers = [
  new NotPersistedCustomer({
    name: "Customer 1",
    email: "customer1@email.com",
    document: "12345678900",
  }),
]

export const seedCustomers = async (CustomerRepository: CustomerRepository) => {
  const persistedProducts: Customer[] = [];
  for (const customer of customers) {
    persistedProducts.push(await CustomerRepository.create(customer));
  }
  return persistedProducts;
}