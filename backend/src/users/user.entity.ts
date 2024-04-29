import { Cart } from 'src/carts/cart.entity';
import { PaymentMethod } from 'src/users/user.types';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  deliveryAddress: string;

  @Column()
  paymentMethod: PaymentMethod;

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];
}
