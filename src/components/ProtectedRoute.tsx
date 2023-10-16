import { useAppSelector } from "../hoocks/useStore";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRouteElement = () => {
  const { message } = useAppSelector((state) => state.checkToken);

  const login = () => {
    if (message === "Token verification is underway" || message === "") {
      setTimeout(() => {}, 300);
    }
    if (message === "Successful authentication") {
      return true;
    } else {
      return false;
    }
  };
  return login() ? <Outlet /> : <Navigate to="/sign-in" />;
};
