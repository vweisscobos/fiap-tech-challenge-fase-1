import { ApiProperty } from "@nestjs/swagger";

export class LoginCustomerDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  document: string;
}