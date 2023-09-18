import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRouteElement = () => {
  const { message } = useSelector((state) => state.checkToken);

  const login = () => {
    if (message === "Authentication error") {
      return false;
    } else if (message === "Successful authentication") {
      return true;
    } else {
      setTimeout(login(), 300);
    }
  };

  return login ? <Outlet /> : <Navigate to="/sign-in" />;
};
