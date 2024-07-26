import { ProductRepository } from "src/core/application/ports/product.repository";
import { NotPersistedProduct, Product } from "src/core/domain/product";
import { ProductCategoryValue } from "src/core/domain/value-objects/product-category";

const products = [
  new NotPersistedProduct({
    name: "Product 1",
    price: 10,
    description: "Description 1",
    category: ProductCategoryValue.Food
  }),
  new NotPersistedProduct({
    name: "Product 2",
    price: 20,
    description: "Description 2",
    category: ProductCategoryValue.Beverage
  }),
]

export const seedProducts = async (productsRepository: ProductRepository) => {
  const persistedProducts: Product[] = [];
  for (const product of products) {
    persistedProducts.push(await productsRepository.create(product));
  }
  return persistedProducts;
}