import { Customer } from "src/core/domain/customer";
import { Customer as PrismaCustomer } from "@prisma/client";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CustomerMapper {
  toPersistence(customer: Customer) {
    return {
      name: customer.name,
      email: customer.email,
      document: customer.document,
    }
  }

  fromPersistence(customer: PrismaCustomer) {
    return new Customer({
      id: customer.id,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
      name: customer.name,
      email: customer.email,
      document: customer.document,
    })
  }
}