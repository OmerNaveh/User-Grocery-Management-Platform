import { ROUTES } from "constants/routes";
import { observer } from "mobx-react";
import React, { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import userStore from "stores/userStore";
import { ModeToggle } from "theme/ModeToggle";
const HeaderUserAvatar = React.lazy(() => import("./HeaderUserAvatar"));

const Header = () => {
  const { user } = userStore;
  const navigate = useNavigate();

  const handleLogout = () => {
    userStore.logout();
    navigate(ROUTES.LOGIN);
  };

  const handleUserDashNav = () => {
    navigate(ROUTES.DASHBOARD);
  };

  const handleProductsNav = () => {
    navigate(ROUTES.PRODUCTS);
  };
  return (
    <header className="w-full px-4 md:px-8 py-4 flex justify-between items-center">
      <h1 className="font-semibold text-lg">Omer Naveh</h1>

      <div className="flex items-center gap-4">
        {!!user && (
          <Suspense fallback={null}>
            <HeaderUserAvatar
              fullName={user.fullName}
              handleLogout={handleLogout}
              handleProductsNav={handleProductsNav}
              handleUserDashNav={handleUserDashNav}
            />
          </Suspense>
        )}
        <ModeToggle />
      </div>
    </header>
  );
};

export default observer(Header);
