import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginCustomerDto } from './dtos/login-customer.dto';
import { CustomerService } from 'src/core/application/services/customer/customer.service';

@ApiTags('customer')
@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    const customer = this.customerService.create(createCustomerDto);
    return customer;
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() loginCustomerDto: LoginCustomerDto) {
    return this.customerService.login(loginCustomerDto.email, loginCustomerDto.document);
  }

}