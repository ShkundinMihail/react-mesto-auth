import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL, BASE_HEADERS } from "../utils/constants";
import { IEditAvatar, IEditUser, IUserInfo } from "../types/typeUsers";
import axios, { AxiosError } from "axios";
import { IUserSlice } from "../types/typeUsers";

export const fetchUser = createAsyncThunk<IUserInfo, void, { rejectValue: AxiosError }>(
  "user/getUserInfo",
  async function (_, { rejectWithValue }) {
    try {
      const { data } = await axios(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: BASE_HEADERS,
      });
      return data;
    } catch (err: any) {
      return rejectWithValue(err as AxiosError);
    }
  }
);
export const editUserInformation = createAsyncThunk<IUserInfo, IEditUser, { rejectValue: AxiosError }>(
  "user/editUserInformation",
  async function (obj, { rejectWithValue }) {
    try {
      const { data } = await axios(`${BASE_URL}/users/me`, {
        method: "PATCH",
        headers: BASE_HEADERS,
        data: obj,
      });
      return data
    } catch (err: any) {
      return rejectWithValue(err as AxiosError);
    }
  }
);
export const editUserAvatar = createAsyncThunk<IUserInfo, IEditAvatar, { rejectValue: AxiosError }>(
  "user/editAvatar",
  async function (obj, { rejectWithValue }) {
    try {
      const { data } = await axios(`${BASE_URL}/users/me/avatar`, {
        method: "PATCH",
        headers: BASE_HEADERS,
        data: obj,
      });
      return (data);
    } catch (err: any) {
      return rejectWithValue(err as AxiosError);
    }
  }
);
const userSlice = createSlice({
  name: "userInfo",
  initialState: {
    statusUser: "",
    error: "",
    name: "",
    about: "",
    avatar: "",
    _id: "",
    cohort: "",
  } as IUserSlice,
  reducers: {
    logoutAction(state) {
      state.statusUser = "";
      state.error = "";
      state.name = "";
      state.about = "";
      state.avatar = "";
      state._id = "";
      state.cohort = "";
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, state => {
        state.statusUser = 'loading'
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<IUserInfo>) => {
        state.statusUser = 'resolved'
        state.name = action.payload.name;
        state.about = action.payload.about;
        state.avatar = action.payload.avatar;
        state._id = action.payload._id;
        state.cohort = action.payload.cohort;

      })
      .addCase(fetchUser.rejected, state => {

      })
      .addCase(editUserInformation.pending, state => {

      })
      .addCase(editUserInformation.fulfilled, (state, action: PayloadAction<IUserInfo>) => {
        state.name = action.payload.name;
        state.about = action.payload.about;
      })
      .addCase(editUserAvatar.rejected, state => {

      })
      .addCase(editUserAvatar.pending, state => {

      })
      .addCase(editUserAvatar.fulfilled, (state, action: PayloadAction<IUserInfo>) => {
        state.avatar = action.payload.avatar;
      })
      .addCase(editUserInformation.rejected, state => {

      })
  },
});
export const { logoutAction } = userSlice.actions;
export default userSlice.reducer;
