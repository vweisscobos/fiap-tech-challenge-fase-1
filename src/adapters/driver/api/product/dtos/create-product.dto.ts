import { ApiProperty } from "@nestjs/swagger";
import { ProductCategoryValue } from "src/core/domain/value-objects/product-category";

export class CreateProductDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  description: string;
  @ApiProperty({ name: 'category', enum: ProductCategoryValue})
  category: ProductCategoryValue;
}