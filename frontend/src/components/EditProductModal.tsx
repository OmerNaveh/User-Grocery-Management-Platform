import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Pen } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useMutation, useQueryClient } from "react-query";
import { editProduct } from "services/apiClient";
import { useToast } from "./ui/useToast";
import { getErrorMessage } from "lib/errors";
import { Product } from "types/cart";

type props = {
  product: Product;
  refetch: () => Promise<void>;
  queryKey: string;
};
const EditProductModal = ({ product, refetch, queryKey }: props) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const nameRef = React.useRef<HTMLInputElement>(null);
  const brandRef = React.useRef<HTMLInputElement>(null);
  const priceRef = React.useRef<HTMLInputElement>(null);

  const { mutate, isLoading } = useMutation({
    mutationKey: `editProduct-${product.id}`,
    mutationFn: async (requestBody: Partial<Product>) => {
      editProduct(product.id, requestBody);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(queryKey);
      await refetch();
      setIsOpen(false);
      toast({ description: "Product updated successfully" });
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast({ description: message, variant: "destructive" });
    },
  });

  const handleEdit = () => {
    let requestBody: Partial<Product> = {};
    if (nameRef.current?.value) {
      requestBody.name = nameRef.current.value;
    }
    if (brandRef.current?.value) {
      requestBody.brand = brandRef.current.value;
    }
    if (
      priceRef.current?.value &&
      !isNaN(Number(priceRef.current.value)) &&
      Number(priceRef.current.value) > 0
    ) {
      requestBody.price = priceRef.current.valueAsNumber;
    }
    if (Object.keys(requestBody).length === 0) {
      toast({
        description: "Please enter some details to update",
        variant: "destructive",
      });
      return;
    }
    mutate(requestBody);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(state) => {
        if (!state) setIsOpen(false);
      }}
    >
      <DialogTrigger onClick={() => setIsOpen(true)}>
        <div className="h-4 w-full p-4 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
          <Pen size={16} />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              type="text"
              placeholder={product.name}
              ref={nameRef}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="brand">Brand</Label>
            <Input
              id="brand"
              type="text"
              placeholder={product.brand}
              ref={brandRef}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              placeholder={product.price.toString()}
              ref={priceRef}
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleEdit}>
            {isLoading ? "Loading.." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;
