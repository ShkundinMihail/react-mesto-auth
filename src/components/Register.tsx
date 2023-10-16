import { AutorizationForm } from "./AutorizationForm";
import { register, registerNextPage } from "../store/authSlice";
import { useAppSelector, useAppDispatch } from "../hoocks/useStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IUserRegisterLogin } from "../types/typeUsers";

export function Register() {
  const { registerOk } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (registerOk) {
      navigate("/sign-in", { replace: true });
      dispatch(registerNextPage());
    }
  }, [dispatch, navigate, registerOk]);

  const handleSubmitForm = ({ email, password }: IUserRegisterLogin): void => {
    dispatch(register({ email, password }));
  };
  return (
    <main className="login">
      <h3 className="login__title">Регистрация</h3>
      <AutorizationForm handleSubmitForm={handleSubmitForm} />
    </main>
  );
}
