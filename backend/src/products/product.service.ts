import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import {
  CreateProductDto,
  EditProductDto,
  ProductQuery,
} from './product.types';
import { validateDto } from 'src/helpers/validation';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll({
    name,
    brand,
    maxPrice,
    minPrice,
  }: ProductQuery): Promise<Product[]> {
    await validateDto({ name, brand, maxPrice, minPrice });
    const queryBuilder = this.productRepository.createQueryBuilder('product');

    // Apply filters based on provided parameters
    if (name) {
      queryBuilder.andWhere('LOWER(product.name) LIKE LOWER(:name)', {
        name: `%${name.toLowerCase()}%`,
      });
    }
    if (brand) {
      queryBuilder.andWhere('LOWER(product.brand) LIKE LOWER(:brand)', {
        brand: `%${brand.toLowerCase()}%`,
      });
    }
    if (minPrice) {
      queryBuilder.andWhere('product.price >= :minPrice', { minPrice });
    }
    if (maxPrice) {
      queryBuilder.andWhere('product.price <= :maxPrice', { maxPrice });
    }
    queryBuilder.orderBy('product.id', 'ASC');
    return queryBuilder.getMany();
  }

  async findOne(id: string): Promise<Product> {
    const product = this.productRepository.findOne({
      where: { id: Number(id) },
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async update(id: string, productBody: EditProductDto): Promise<Product> {
    const productToUpdate = await this.productRepository.findOne({
      where: { id: Number(id) },
    });

    if (!productToUpdate) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    await validateDto(productBody);

    this.productRepository.merge(productToUpdate, productBody);

    return await this.productRepository.save(productToUpdate);
  }

  async create(product: CreateProductDto): Promise<Product> {
    validateDto(product);
    const newProduct = this.productRepository.create(product);
    return await this.productRepository.save(newProduct);
  }
}
