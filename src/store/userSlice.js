import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, BASE_HEADERS } from "../utils/constants";

export const fetchUser = createAsyncThunk(
  "user/getUserInfo",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: BASE_HEADERS,
      });
      if (!response.ok) {
        throw new Error("Error in user data");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const editUserInformation = createAsyncThunk(
  "user/editUserInformation",
  async function (obj, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(`${BASE_URL}/users/me`, {
        method: "PATCH",
        headers: BASE_HEADERS,
        body: JSON.stringify(obj),
      });
      if (!response.ok) {
        throw new Error("Error in user data");
      }
      const data = await response.json();
      dispatch(editUserInformationAction(data));
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const editUserAvatar = createAsyncThunk(
  "user/editAvatar",

  async function (obj, { rejectWithValue, dispatch }) {
    try {
      const res = await fetch(`${BASE_URL}/users/me/avatar`, {
        method: "PATCH",
        headers: BASE_HEADERS,
        body: JSON.stringify(obj),
      });
      if (!res.ok) {
        throw new Error("Error in user data");
      }
      const data = await res.json();
      dispatch(editUserAvatarAction(data));
    } catch (err) {
      return rejectWithValue(err.message);
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
  },
  reducers: {
    editUserInformationAction(state, action) {
      state.name = action.payload.name;
      state.about = action.payload.about;
    },
    editUserAvatarAction(state, action) {
      state.avatar = action.payload.avatar;
    },
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
  extraReducers: {
    [fetchUser.pending]: (state) => {
      state.statusUser = "loading";
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.statusUser = "resolved";
      state.name = action.payload.name;
      state.about = action.payload.about;
      state.avatar = action.payload.avatar;
      state._id = action.payload._id;
      state.cohort = action.payload.cohort;
    },
    [fetchUser.rejected]: (state, action) => {
      state.statusUser = action.payload;
      state.error = action.payload;
    },
    [editUserInformation.rejected]: (state, action) => {
      state.statusUser = "error when changing the info";
      state.error = action.payload;
    },
    [editUserAvatar.rejected]: (state, action) => {
      state.statusUser = "error when changing the avatar";
      state.error = action.payload;
    },
  },
});
const { editUserInformationAction, editUserAvatarAction } = userSlice.actions;
export const { logoutAction } = userSlice.actions;
export default userSlice.reducer;
