export type Cart = {
  id: number;
  isSettled: boolean;
  items: CartItem[];
  total: number;
};

export type CartItem = {
  id: number;
  quantity: number;
  product: Product;
  totalPrice: number;
};

export type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
};
