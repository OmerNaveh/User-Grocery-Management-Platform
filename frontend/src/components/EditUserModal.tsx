import React, { useState } from "react";
import { CreateUserProps, PaymentMethod, UserWithCart } from "types/user";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useMutation, useQueryClient } from "react-query";
import { editUser } from "services/apiClient";
import { useToast } from "./ui/useToast";
import { getErrorMessage } from "lib/errors";

type props = {
  user: UserWithCart;
  refetch: () => Promise<void>;
};
const EditUserModal = ({ user, refetch }: props) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const nameRef = React.useRef<HTMLInputElement>(null);
  const deliveryAdressRef = React.useRef<HTMLInputElement>(null);
  const [paymentMethod, setPaymentMethod] = React.useState<
    PaymentMethod | undefined
  >(user.paymentMethod);

  const { mutate, isLoading } = useMutation({
    mutationKey: `editUser-${user.id}`,
    mutationFn: async (requestBody: Partial<CreateUserProps>) => {
      editUser(user.id, requestBody);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("allUsers");
      await refetch();
      setIsOpen(false);
      toast({ description: "User updated successfully" });
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast({ description: message, variant: "destructive" });
    },
  });
  const handleEdit = () => {
    let requestBody: Partial<CreateUserProps> = {};
    if (nameRef.current?.value) {
      requestBody.fullName = nameRef.current.value;
    }
    if (deliveryAdressRef.current?.value) {
      requestBody.deliveryAddress = deliveryAdressRef.current.value;
    }
    if (paymentMethod && user.paymentMethod !== paymentMethod) {
      requestBody.paymentMethod = paymentMethod;
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
        <div className="absolute top-0 right-0 bg-green-500 text-white p-1 rounded-full h-6 w-6 hover:cursor-pointer active:opacity-70">
          <Pen className="h-full w-full" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder={user.fullName}
              ref={nameRef}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Delivery Address</Label>
            <Input
              id="adress"
              type="text"
              placeholder={user.deliveryAddress}
              ref={deliveryAdressRef}
            />
          </div>
          <div className="grid gap-2">
            <Select
              value={paymentMethod}
              onValueChange={(val) => {
                setPaymentMethod((prev) => {
                  if (prev === val) {
                    return undefined;
                  }
                  if (
                    val === PaymentMethod.CASH ||
                    val === PaymentMethod.CREDIT_CARD
                  )
                    return val;
                });
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Payment Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={PaymentMethod.CASH}>Cash</SelectItem>
                <SelectItem value={PaymentMethod.CREDIT_CARD}>
                  Credit
                </SelectItem>
              </SelectContent>
            </Select>
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

export default EditUserModal;
