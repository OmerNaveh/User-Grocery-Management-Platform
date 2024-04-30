import React, { useRef, useState } from "react";
import { CartItem } from "types/cart";
import { Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useToast } from "./ui/useToast";

type props = {
  item: CartItem;
  handleRemoveFromCart: (cartItemId: number) => void;
  handleQuantityChange: (cartItemId: number, quantity: number) => void;
};
const CartListItem = ({
  item,
  handleRemoveFromCart,
  handleQuantityChange,
}: props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleChangeQuantity = () => {
    if (
      !inputRef.current?.value ||
      parseInt(inputRef.current.value) === 0 ||
      parseInt(inputRef.current.value) < 0
    ) {
      toast({
        description: "Please provide a valid quantity",
        variant: "destructive",
      });
      return;
    }
    const newQuantity = parseInt(inputRef.current.value);
    handleQuantityChange(item.id, newQuantity);
    setIsOpen(false);
  };
  return (
    <div className="grid grid-cols-3 w-full items-center">
      <div className="flex gap-2 items-center">
        <button
          onClick={() => handleRemoveFromCart(item.product.id)}
          className="text-red-500 active:opacity-70"
        >
          <Trash size={16} />
        </button>
        <p>{item.product.name}</p>
      </div>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) setIsOpen(false);
        }}
      >
        <DialogTrigger onClick={() => setIsOpen(true)}>
          <p className="text-center">
            Quantity:{" "}
            <span className="underline hover:cursor-pointer active:opacity-70">
              {item.quantity}
            </span>
          </p>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Quantity</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                placeholder={item.quantity.toString()}
                ref={inputRef}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleChangeQuantity}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <p className="text-end">Price: {item.product.price}$</p>
    </div>
  );
};

export default CartListItem;
