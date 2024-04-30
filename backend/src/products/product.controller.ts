import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, EditProductDto } from './product.types';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('all')
  async findAll(
    @Query('name') name?: string,
    @Query('brand') brand?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
  ) {
    return this.productService.findAll({ name, brand, minPrice, maxPrice });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Put(':id')
  async update(@Body() body: EditProductDto, @Param('id') id: string) {
    return this.productService.update(id, body);
  }

  @Post()
  async create(@Body() body: CreateProductDto) {
    return this.productService.create(body);
  }
}
