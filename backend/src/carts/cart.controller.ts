import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { UserService } from 'src/users/user.service';
import { ProductService } from 'src/products/product.service';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) {}

  @Get(':userId')
  async getCart(@Param('userId') userId: number) {
    const user = await this.userService.findOne(String(userId));
    return this.cartService.getCart(user);
  }

  @Post(':userId/products/:productId')
  async addToCart(
    @Param('userId') userId: number,
    @Param('productId') productId: number,
    @Body('quantity') quantity: number,
  ) {
    const user = await this.userService.findOne(String(userId));
    const product = await this.productService.findOne(String(productId));

    await this.cartService.addToCart(user, product, quantity);
  }

  @Delete(':userId/products/:productId')
  async removeFromCart(
    @Param('userId') userId: number,
    @Param('productId') productId: number,
  ) {
    const user = await this.userService.findOne(String(userId));
    const product = await this.productService.findOne(String(productId));

    await this.cartService.removeFromCart(user, product);
  }

  @Put(':userId/products/:productId')
  async updateCartItemQuantity(
    @Param('userId') userId: number,
    @Param('productId') productId: number,
    @Body('quantity') quantity: number,
  ) {
    const user = await this.userService.findOne(String(userId));
    const product = await this.productService.findOne(String(productId));

    await this.cartService.updateCartItemQuantity(user, product, quantity);
  }

  @Post(':userId/checkout')
  async checkout(@Param('userId') userId: number) {
    const user = await this.userService.findOne(String(userId));

    await this.cartService.checkout(user);
  }
}
