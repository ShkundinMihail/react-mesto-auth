import { login } from "../store/authSlice";
import { verificationTokenAsync } from "../store/checkTokenSlice";
import { AutorizationForm } from "./AutorizationForm";
import { useAppDispatch } from "../hoocks/useStore";
import { IUserRegisterLogin } from "../types/typeUsers";

export function Login() {
  const dispatch = useAppDispatch();

  const handleLogin = async (authData: IUserRegisterLogin) => {
    await dispatch(login(authData));
    await dispatch(verificationTokenAsync());
  };

  return (
    <main className="login">
      <h3 className="login__title">Вход</h3>
      <AutorizationForm handleSubmitForm={handleLogin} />
    </main>
  );
}
