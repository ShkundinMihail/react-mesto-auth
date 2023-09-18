import { AutorizationForm } from "./AutorizationForm";
import { register, registerOkDecontamination } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Register() {
  const { registerOk } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (registerOk) {
      navigate("/sign-in", { replace: true });
      dispatch(registerOkDecontamination());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerOk]);

  const handleSubmitForm = async (authData) => {
    await dispatch(register(authData));
  };
  return (
    <main className="login">
      <h3 className="login__title">Регистрация</h3>
      <AutorizationForm handleSubmitForm={handleSubmitForm} />
    </main>
  );
}
