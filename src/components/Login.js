import { login } from "../store/authSlice";
import { verificationTokenAsync } from "../store/checkTokenSlice";
import { AutorizationForm } from "./AutorizationForm";
import { useDispatch } from "react-redux";

export function Login() {
  const dispatch = useDispatch();

  const handleLogin = async (authData) => {
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
