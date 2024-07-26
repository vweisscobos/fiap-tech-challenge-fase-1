import { Product } from "src/core/domain/product";
import { Product as PrismaProduct } from "@prisma/client"
import { ProductCategoryValue } from "src/core/domain/value-objects/product-category";

export class ProductMapper {
  toPersistence(product: Product) {
    return {
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category.getValue()
    }
  }

  fromPersistence(product: PrismaProduct) {
    return new Product({
      id: product.id,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      name: product.name,
      price: product.price,
      description: product.description,
      category: ProductCategoryValue[product.category],
    })
  }
}