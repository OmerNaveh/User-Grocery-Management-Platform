import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/carts/cart.entity';
import { initialData } from 'src/data/initialData';
import { normalizeUser } from 'src/helpers/normalize';
import { Product } from 'src/products/product.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PopulateDbService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async populate() {
    if (!!process.env.LOCAL_ENV) return; // Prevents data population in local environment
    initialData.users.forEach(async (user) => {
      const normalizedUser = normalizeUser(user);
      await this.userRepository.save(normalizedUser);
    });

    initialData.products.forEach(async (product) => {
      await this.productRepository.save(product);
    });
  }
}
