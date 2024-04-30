import React from "react";
import { UserWithCart } from "types/user";
import EditUserModal from "./EditUserModal";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "constants/routes";

type props = {
  user: UserWithCart;
  refetch: () => Promise<void>;
};
const UserDashCard = ({ user, refetch }: props) => {
  const naviate = useNavigate();
  const handleCartNaviagation = () => {
    naviate(ROUTES.CART, { state: { user } });
  };
  return (
    <div className="p-2 w-1/2 relative">
      <div className="bg-slate-300 dark:bg-slate-700 p-2 flex flex-col gap-2">
        <EditUserModal user={user} refetch={refetch} />
        <h2 className="text-lg text-center font-semibold text-ellipsis">
          {user.fullName}
        </h2>
        <div className="flex items-center justify-between">
          <p>{user.deliveryAddress}</p>
          <p>{user.paymentMethod}</p>
        </div>

        <div className="flex items-center justify-between">
          <p>
            Total items:{" "}
            {user?.activeCart?.items?.reduce(
              (acc, item) => acc + item.quantity,
              0
            ) || 0}
          </p>
          <p>Total price: {user?.activeCart?.total || 0}$</p>
        </div>

        <Button onClick={handleCartNaviagation} className="h-6 w-full">
          <ShoppingCart size={16} />
        </Button>
      </div>
    </div>
  );
};

export default UserDashCard;
