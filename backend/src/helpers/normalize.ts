import { Cart } from 'src/carts/cart.entity';
import { CartResponse } from 'src/carts/cart.types';
import { PaymentMethod } from 'src/users/user.types';

export const normalizeCartResponse = (cart: Cart): CartResponse => {
  return {
    id: cart.id,
    isSettled: cart.isSettled,
    items: cart.items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      product: {
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
      },
      totalPrice: item.quantity * item.product.price,
    })),

    total: cart.items.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0,
    ),
  };
};

export const normalizeUser = (user: {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
}) => {
  return {
    id: user.id,
    fullName: user.name,
    deliveryAddress: user.address.street + ',' + user.address.city,
    paymentMethod:
      Math.random() >= 0.5 ? PaymentMethod.CASH : PaymentMethod.CREDIT_CARD,
  };
};
