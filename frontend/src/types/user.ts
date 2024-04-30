import { Cart } from "./cart";

export enum PaymentMethod {
  CREDIT_CARD = "credit_card",
  CASH = "cash",
}

export type User = {
  id: number;
  fullName: string;
  deliveryAddress: string;
  paymentMethod: PaymentMethod;
};

export type CreateUserProps = {
  fullName: string;
  deliveryAddress: string;
  paymentMethod: PaymentMethod;
};

export type UserWithCart = User & {
  carts: Cart[] | null;
  activeCart: Cart | null;
};
