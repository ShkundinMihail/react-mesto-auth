import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL_AUTH } from "../utils/constants";
import { popupInfoTooltipOpen } from "./popupSlice";
import authorizationSuccessfulImage from "../images/good.svg";
import authorizationFailedImage from "../images/bad.svg";
import { IRegisterSlice, IUserRegisterLogin } from "../types/typeUsers";
import axios, { AxiosError } from "axios";

export const register = createAsyncThunk<void, IUserRegisterLogin, { rejectValue: AxiosError }>(
  "auth/register",
  async function (
    { email, password }: IUserRegisterLogin,
    { rejectWithValue, dispatch }
  ) {
    try {
      await axios(`${BASE_URL_AUTH}/signup`, {
        method: "POST",
        data: { email, password },
      });
      dispatch(login({ email, password }));
    } catch (err: any) {
      if (err.message) {
        dispatch(
          popupInfoTooltipOpen({
            image: authorizationFailedImage,
            text: err.message,
          })
        );
      }
      return rejectWithValue(err as AxiosError);
    }
  }
);
export const login = createAsyncThunk<
  void,
  IUserRegisterLogin,
  { rejectValue: AxiosError }
>(
  "auth/login",
  async function ({ email, password }: IUserRegisterLogin, { rejectWithValue, dispatch }) {
    try {
      const { data } = await axios(`${BASE_URL_AUTH}/signin`, {
        method: "POST",
        data: { email, password },
      });
      localStorage.setItem("token", data.token);
      dispatch(
        popupInfoTooltipOpen({
          image: authorizationSuccessfulImage,
          text: "добро пожаловать",
        })
      );
      dispatch(loginOkActivation());
    } catch (err: any) {
      if (err.message) {
        dispatch(
          popupInfoTooltipOpen({
            image: authorizationFailedImage,
            text: err.message,
          })
        );
      }
      return rejectWithValue(err as AxiosError);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    registerOk: false,
    loginOk: false,
  } as IRegisterSlice,
  reducers: {
    registerOkActivation(state) {
      state.registerOk = true;
    },
    registerNextPage(state) {
      state.registerOk = false;
    },
    loginOkActivation(state) {
      state.loginOk = true;
    },
    loginDisactivation(state) {
      state.loginOk = false;
    },
  },
});
export const {
  registerOkActivation,
  registerNextPage,
  loginDisactivation,
  loginOkActivation,
} = authSlice.actions;
export default authSlice.reducer;
