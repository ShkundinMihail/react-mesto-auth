import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ITokenResponse } from "../types/typeUsers";
import { IErrorObj } from "../types/typeCards";
import { ITokenState } from "../types/typeUsers";
import axios from "axios";
import { BASE_URL_CHECK_TOKEN } from "../utils/constants";

export const verificationTokenAsync = createAsyncThunk<ITokenResponse, void, { rejectValue: string }>(
  "todos/verificationTokenAsync",

  async function (_, { rejectWithValue }) {
    try {
      const token = await localStorage.getItem("token");
      if (!token) {
        throw new Error("Authorization required");
      }
      const response = await axios.get(BASE_URL_CHECK_TOKEN, { headers: { Authorization: `Bearer ${token}` }, })
      if (response.status !== 200) {
        throw new Error("Authorization required");
      }
      const { email, _id } = response.data
      return ({ email, _id }) as ITokenResponse;
    } catch (error: unknown) {
      const errMsg = JSON.stringify(error as IErrorObj | string)
      return rejectWithValue(errMsg);
    }
  }
);

const checkTokenSlice = createSlice({
  name: "checkLogin",
  initialState: {
    loginUser: false,
    message: "",
    userId: "",
    userEmail: "",
  } as ITokenState,
  reducers: {
    logoutToken(state) {
      state.loginUser = false;
      state.message = "";
      state.userId = "";
      state.userEmail = "";
    },
    loginToken(state) {
      state.loginUser = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verificationTokenAsync.pending, state => {
        state.message = "Token verification is underway";
        state.loginUser = false;
        state.userId = "";
        state.userEmail = "";
      })
      .addCase(verificationTokenAsync.fulfilled, (state, action: any) => {
        state.loginUser = true;
        state.message = "Successful authentication";
        state.userEmail = action.payload.email;
        state.userId = action.payload._id;
      })
      .addCase(verificationTokenAsync.rejected, (state, action: any) => {
        state.message = action.payload;
        state.loginUser = false;
        state.userId = "";
        state.userEmail = "";
      },)
  },
});
export const { logoutToken, loginToken } = checkTokenSlice.actions;
export default checkTokenSlice.reducer;
