/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { Main } from "./Main";
import { Footer } from "./Footer";
import { Login } from "./Login";
import { Register } from "./Register";
import { InfoTooltip } from "./InfoTooltip";
import { ImagePopup } from "./ImagePopup";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { EditProfilePopup } from "./EditProfilePopup";
import { AddPlacePopup } from "./AddPlacePopup";
import { ProtectedRouteElement } from "./ProtectedRoute";
import { NotFoundPage } from "./NotFoundPage";
import { fetchCards } from "../store/cardSlice";
import { verificationTokenAsync } from "../store/checkTokenSlice";
import { fetchUser } from "../store/userSlice";
import { DeleteCardPopup } from "./DeleteCardPopup";
import { useAppSelector, useAppDispatch } from "../hoocks/useStore";
import { loginDisactivation } from "../store/authSlice";

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(verificationTokenAsync());
  }, []);
  const { loginUser } = useAppSelector((state) => state.checkToken);
  const { loginOk } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (loginUser || loginOk) {
      dispatch(fetchCards());
      dispatch(fetchUser());
      navigate("/", { replace: true });
      dispatch(loginDisactivation());
    }
  }, [loginUser, dispatch, loginOk]);

  return (
    <>
      <Header />
      <Routes>
        <Route element={<ProtectedRouteElement />}>
          <Route path="/" element={<Main />} />
        </Route>
        <Route path="/sign-up" element={<Register />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <InfoTooltip />
      <ImagePopup />
      <EditAvatarPopup />
      <EditProfilePopup />
      <AddPlacePopup />
      <DeleteCardPopup />
      <Footer />
    </>
  );
}

export default App;
