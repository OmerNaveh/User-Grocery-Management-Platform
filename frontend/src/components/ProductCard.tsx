import React, { useState } from "react";
import { Product } from "types/cart";
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";

type props = {
  product: Product;
  handleAddToCart: (productId: number, quantity: number) => void;
  isLoading: boolean;
};
const ProductCard = ({ product, handleAddToCart, isLoading }: props) => {
  const [quantity, setQuantity] = useState<number>(0);
  const handleProductAddToCart = () => {
    handleAddToCart(product.id, quantity);
    setQuantity(0);
  };
  return (
    <div className="p-2 w-full relative">
      <div className="bg-slate-300 dark:bg-slate-700 p-2 flex flex-col gap-2">
        <h2 className="text-center text-lg font-semibold text-ellipsis">
          {product.name}
        </h2>

        <div className="flex items-center justify-between w-full">
          <p>{product.brand}</p>
          <p>{product.price}$</p>
        </div>

        <div className="flex items-center justify-between">
          <Button
            disabled={!quantity}
            onClick={() => setQuantity((prev) => prev - 1)}
            className="h-4 w-4 text-lg p-4"
          >
            -
          </Button>
          <p>{quantity}</p>
          <Button
            onClick={() => setQuantity((prev) => prev + 1)}
            className="h-4 w-4 text-lg p-4"
          >
            +
          </Button>
        </div>

        <Button
          disabled={!quantity || !!isLoading}
          onClick={handleProductAddToCart}
          className="h-4 w-full p-4"
        >
          {!!isLoading ? "Adding..." : <ShoppingBag size={16} />}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
