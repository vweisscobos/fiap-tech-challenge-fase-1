import { NotPersistedProduct, Product } from "src/core/domain/product";
import { ProductCategoryValue } from "src/core/domain/value-objects/product-category";

export abstract class ProductRepository {
  abstract create(product: NotPersistedProduct): Promise<Product>;
  abstract findByIDs(ids: string[]): Promise<Product[]>;
  abstract findByCategory(category: ProductCategoryValue): Promise<Product[]>;
  abstract delete(id: string): Promise<void>;
  abstract update(id: string, product: Product): Promise<Product>;
  abstract find(id: string): Promise<Product | null>;
}