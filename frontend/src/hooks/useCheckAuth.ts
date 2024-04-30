import { ROUTES } from "constants/routes";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

type props = {
  isLoggedIn: boolean;
};
const useCheckAuth = ({ isLoggedIn }: props) => {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!!isLoggedIn) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [isLoggedIn]);
};

export default useCheckAuth;
