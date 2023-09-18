import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_HEADERS_AUTH, BASE_URL_AUTH } from "../utils/constants";
import { popupInfoTooltipOpen } from "./popupSlice";
import authorizationSuccessfulImage from "../images/good.svg";
import authorizationFailedImage from "../images/bad.svg";

export const register = createAsyncThunk(
  "auth/register",
  async function (authData, { rejectWithValue, dispatch }) {
    try {
      const res = await fetch(`${BASE_URL_AUTH}/signup`, {
        method: "POST",
        headers: BASE_HEADERS_AUTH,
        body: JSON.stringify(authData),
      });
      if (!res.ok) {
        throw new Error("authorization error");
      }
      dispatch(
        popupInfoTooltipOpen({
          image: authorizationSuccessfulImage,
          text: "выполните вход в аккаунт",
        })
      );
      dispatch(registerOkActivation());
    } catch (err) {
      return (
        rejectWithValue(err.message),
        dispatch(
          popupInfoTooltipOpen({
            image: authorizationFailedImage,
            text: "попробуйте еще раз",
          })
        )
      );
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async function (authData, { rejectWithValue, dispatch }) {
    try {
      const res = await fetch(`${BASE_URL_AUTH}/signin`, {
        method: "POST",
        headers: BASE_HEADERS_AUTH,
        body: JSON.stringify(authData),
      });
      if (!res.ok) {
        throw new Error("authorization error");
      }
      const data = await res.json();
      localStorage.setItem("token", data.token);
      dispatch(
        popupInfoTooltipOpen({
          image: authorizationSuccessfulImage,
          text: "добро пожаловать",
        })
      );
    } catch (err) {
      return (
        rejectWithValue(err.message),
        dispatch(
          popupInfoTooltipOpen({
            image: authorizationFailedImage,
            text: "попробуйте еще раз",
          })
        )
      );
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    registerOk: false,
  },
  reducers: {
    registerOkActivation(state) {
      state.registerOk = true;
    },
    registerOkDecontamination(state) {
      state.registerOk = false;
    },
  },
});
export const { registerOkActivation, registerOkDecontamination } =
  authSlice.actions;
export default authSlice.reducer;
