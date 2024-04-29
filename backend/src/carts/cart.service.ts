import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { CartItem } from './cart-item.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Product } from 'src/products/product.entity';
import { normalizeCartResponse } from 'src/helpers/normalize';
import { CartResponse } from './cart.types';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ) {}

  async getCart(user: User): Promise<CartResponse> {
    const cart = await this.cartRepository.findOne({
      where: { user, isSettled: false },
      relations: ['items', 'items.product'],
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return normalizeCartResponse(cart);
  }

  async addToCart(
    user: User,
    product: Product,
    quantity: number,
  ): Promise<void> {
    if (quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than 0');
    }

    let cart = await this.cartRepository.findOne({
      where: { user, isSettled: false },
    });
    if (!cart) {
      cart = new Cart();
      cart.user = user;
      await this.cartRepository.save(cart);
    }

    let cartItem = await this.cartItemRepository.findOne({
      where: { cart, product },
    });
    if (!cartItem) {
      cartItem = new CartItem();
      cartItem.cart = cart;
      cartItem.product = product;
      cartItem.quantity = quantity;
    } else {
      cartItem.quantity += quantity;
    }

    await this.cartItemRepository.save(cartItem);
  }

  async removeFromCart(user: User, product: Product): Promise<void> {
    const cart = await this.cartRepository.findOne({
      where: { user, isSettled: false },
    });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const cartItem = await this.cartItemRepository.findOne({
      where: { cart, product },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    await this.cartItemRepository.remove(cartItem);
  }

  async updateCartItemQuantity(
    user: User,
    product: Product,
    quantity: number,
  ): Promise<void> {
    const cart = await this.cartRepository.findOne({
      where: { user, isSettled: false },
    });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const cartItem = await this.cartItemRepository.findOne({
      where: { cart, product },
    });
    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    cartItem.quantity = quantity;
    await this.cartItemRepository.save(cartItem);
  }

  async checkout(user: User): Promise<void> {
    const cart = await this.cartRepository.findOne({ where: { user } });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    cart.isSettled = true;
    await this.cartRepository.save(cart);
  }
}
