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
import { useToast } from "components/ui/useToast";
import { ROUTES } from "constants/routes";
import useCheckAuth from "hooks/useCheckAuth";
import { getErrorMessage } from "lib/errors";
import { observer } from "mobx-react";
import { useRef } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { authUser } from "services/apiClient";
import userStore from "stores/userStore";

const LoginPage = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setUser, isLoggedIn } = userStore;
  useCheckAuth({ isLoggedIn }); // Check if user is logged in and redirect to dashboard

  const { mutate, isLoading } = useMutation({
    mutationKey: "login",
    mutationFn: async (fullName: string) => authUser(fullName),
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
    if (!nameRef.current?.value) {
      toast({
        description: "Please enter your full name",
        variant: "destructive",
      });
      return;
    }
    mutate(nameRef.current.value);
  };
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Card className="w-full max-w-sm mx-4 md:mx-0">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
          <CardDescription>Enter your full name to enter</CardDescription>
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
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleClick}>
            {isLoading ? "Loading" : "Sign in"}
          </Button>
        </CardFooter>
        <div className="py-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to={ROUTES.SIGN_UP} className="underline">
            Sign up
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default observer(LoginPage);
