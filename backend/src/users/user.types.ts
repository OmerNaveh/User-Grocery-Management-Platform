export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  CASH = 'cash',
}

export class UpdateUserDto {
  fullName: string;
  deliveryAddress: string;
  paymentMethod: PaymentMethod;
}
