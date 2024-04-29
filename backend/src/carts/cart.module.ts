import { Module } from '@nestjs/common';
import { Cart } from './cart.entity';
import { CartItem } from './cart-item.entity';
import { User } from 'src/users/user.entity';
import { Product } from 'src/products/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { UserService } from 'src/users/user.service';
import { ProductService } from 'src/products/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItem, User, Product])],
  controllers: [CartController],
  providers: [CartService, UserService, ProductService],
})
export class CartModule {}
