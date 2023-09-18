/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Header } from "./Header.js";
import { Main } from "./Main.js";
import { Footer } from "./Footer.js";
import { Login } from "./Login";
import { Register } from "./Register";
import { InfoTooltip } from "./InfoTooltip.js";
import { ImagePopup } from "./ImagePopup.js";
import { EditAvatarPopup } from "./EditAvatarPopup.js";
import { EditProfilePopup } from "./EditProfilePopup.js";
import { AddPlacePopup } from "./AddPlacePopup.js";
import { ProtectedRouteElement } from "./ProtectedRoute.js";
import { NotFoundPage } from "./NotFoundPage.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchCards } from "../store/cardSlice.js";
import { verificationTokenAsync } from "../store/checkTokenSlice.js";
import { fetchUser } from "../store/userSlice.js";
import { DeleteCardPopup } from "./DeleteCardPopup.js";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(verificationTokenAsync());
  }, []);
  const { loginUser } = useSelector((state) => state.checkToken);
  useEffect(() => {
    if (loginUser) {
      dispatch(fetchCards());
      dispatch(fetchUser());
      navigate("/", { replace: true });
    }
  }, [loginUser, dispatch]);

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
