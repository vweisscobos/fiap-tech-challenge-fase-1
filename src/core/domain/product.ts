import { Entity, NotPersistedEntity, PersistedEntity } from "./entity";
import { ProductCategory, ProductCategoryValue } from "./value-objects/product-category";

class _Product<T extends PersistedEntity | NotPersistedEntity = PersistedEntity> extends Entity<T> {
  name: string;
  price: number;
  description: string;
  category: ProductCategory;

  constructor(product: {
    name: string;
    price: number;
    description: string;
    category: ProductCategoryValue
  } & T) {
    super(product);
    this.name = product.name;
    this.price = product.price;
    this.description = product.description;
    this.category = new ProductCategory(product.category);
  }

  update(product: { name: string; price: number; description: string; category: ProductCategoryValue }) {
    this.name = product.name;
    this.price = product.price;
    this.description = product.description;
    this.category = new ProductCategory(product.category);
  }
}

export class Product extends _Product {}

export class NotPersistedProduct extends _Product<NotPersistedEntity> {}
