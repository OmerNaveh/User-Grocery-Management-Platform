import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './product.types';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('all')
  async findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(id: string) {
    return this.productService.findOne(id);
  }

  @Put(':id')
  async update(@Body() body: CreateProductDto, id: string) {
    return this.productService.update(id, body);
  }

  @Post()
  async create(@Body() body: CreateProductDto) {
    return this.productService.create(body);
  }
}
