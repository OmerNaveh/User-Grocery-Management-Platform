import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './product.types';
import { validateDto } from 'src/helpers/validation';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
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

  async update(id: string, product: CreateProductDto): Promise<Product> {
    const productToUpdate = await this.productRepository.findOne({
      where: { id: Number(id) },
    });

    if (!productToUpdate) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    validateDto(product);

    this.productRepository.merge(productToUpdate, product);

    return await this.productRepository.save(productToUpdate);
  }

  async create(product: CreateProductDto): Promise<Product> {
    validateDto(product);
    const newProduct = this.productRepository.create(product);
    return await this.productRepository.save(newProduct);
  }
}
