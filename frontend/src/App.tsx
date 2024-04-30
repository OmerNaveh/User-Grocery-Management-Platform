import { Suspense, lazy, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Fallback, Layout } from "pages/Layout";
import { ROUTES } from "constants/routes";
import LoginPage from "pages/LoginPage";
import SignUp from "pages/SignUp";
import userStore from "stores/userStore";
import { observer } from "mobx-react";

const UserDashboard = lazy(() => import("pages/UserDashboard"));
const UserCart = lazy(() => import("pages/UserCart"));
const Products = lazy(() => import("pages/Products"));

const App = observer(() => {
  const { init, isLoggedIn } = userStore;

  useEffect(() => {
    init(); // Check if user is logged in
  }, []);

  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<LoginPage />} path={ROUTES.LOGIN} />
          <Route element={<SignUp />} path={ROUTES.SIGN_UP} />
          {!!isLoggedIn && (
            <>
              <Route element={<UserDashboard />} path={ROUTES.DASHBOARD} />
              <Route element={<UserCart />} path={ROUTES.CART} />
              <Route element={<Products />} path={ROUTES.PRODUCTS} />
            </>
          )}
          {/* Fallback */}
          <Route path="*" element={<Navigate to={ROUTES.LOGIN} />} />
        </Route>
      </Routes>
    </Suspense>
  );
});

export default App;
