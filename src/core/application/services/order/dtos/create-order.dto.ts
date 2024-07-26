import { ApiProperty } from "@nestjs/swagger";

class OrderProductDto {
  id: string;
  quantity: number;
}

export class CreateOrderDto {
  customerId?: string;
  @ApiProperty({ type: () => OrderProductDto, isArray: true })
  products: OrderProductDto[];
}

