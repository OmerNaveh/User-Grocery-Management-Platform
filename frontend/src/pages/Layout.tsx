import Header from "components/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="h-full w-full flex flex-col">
      <Header />
      {<Outlet />}
    </div>
  );
};
const Fallback = () => {
  return (
    <div className="h-full w-full flex flex-col">
      <Header />
      <div className="h-full w-full flex justify-center items-center">
        <h1>Loading...</h1>
      </div>
    </div>
  );
};

export { Layout, Fallback };
