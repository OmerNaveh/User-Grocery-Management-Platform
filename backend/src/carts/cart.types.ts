export type CartResponse = {
  id: number;
  isSettled: boolean;
  items: {
    id: number;
    quantity: number;
    product: {
      id: number;
      name: string;
      price: number;
    };
    totalPrice: number;
  }[];
  total: number;
};
