import { Button } from "components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import { useToast } from "components/ui/useToast";
import { ROUTES } from "constants/routes";
import useCheckAuth from "hooks/useCheckAuth";
import { getErrorMessage } from "lib/errors";
import { observer } from "mobx-react";
import { useRef, useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "services/apiClient";
import userStore from "stores/userStore";
import { CreateUserProps, PaymentMethod } from "types/user";

const SignUp = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const deliveryAdressRef = useRef<HTMLInputElement>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | undefined>(
    undefined
  );
  const { setUser, isLoggedIn } = userStore;
  const navigate = useNavigate();

  const { toast } = useToast();
  useCheckAuth({ isLoggedIn }); // Check if user is logged in and redirect to dashboard

  const { mutate, isLoading } = useMutation({
    mutationKey: "signUp",
    mutationFn: async (userProps: CreateUserProps) => createUser(userProps),
    onSuccess: (data) => {
      setUser(data);
      navigate(ROUTES.DASHBOARD);
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast({ description: message, variant: "destructive" });
    },
  });

  const handleClick = () => {
    if (
      !nameRef.current?.value ||
      !deliveryAdressRef.current?.value ||
      !paymentMethod
    ) {
      toast({
        description: "All fields are required",
        variant: "destructive",
      });
      return;
    }
    mutate({
      fullName: nameRef.current.value,
      deliveryAddress: deliveryAdressRef.current.value,
      paymentMethod: paymentMethod,
    });
  };
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Card className="w-full max-w-sm mx-4 md:mx-0">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
          <CardDescription>
            Create your account by filling the following details
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Israel Israeli"
              ref={nameRef}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Delivery Address</Label>
            <Input
              id="adress"
              type="text"
              placeholder="21 Jump street, NY"
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
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleClick}>
            {isLoading ? "Loading" : "Create User"}
          </Button>
        </CardFooter>
        <div className="py-4 text-center text-sm">
          Already have an account?{" "}
          <Link to={ROUTES.LOGIN} className="underline">
            Log In
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default observer(SignUp);
