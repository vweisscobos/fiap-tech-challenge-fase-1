import { ApiProperty } from "@nestjs/swagger";

class OrderProductDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty()
  customerId?: string;
  @ApiProperty({ type: [OrderProductDto] })
  products: OrderProductDto[];
}