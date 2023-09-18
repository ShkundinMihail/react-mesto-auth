import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const verificationTokenAsync = createAsyncThunk(
  "todos/verificationTokenAsync",

  async function (_, { rejectWithValue, dispatch }) {
    try {
      const token = await localStorage.getItem("token");
      if (!token) {
        throw new Error("Authorization required");
      }
      const response = await fetch(`https://auth.nomoreparties.co/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Authorization required");
      }
      dispatch(loginToken());
      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const checkTokenSlice = createSlice({
  name: "checkLogin",
  initialState: {
    loginUser: null,
    message: "",
    userId: "",
    userEmail: "",
  },
  reducers: {
    logoutToken(state) {
      state.loginUser = null;
      state.message = "";
      state.userId = "";
      state.userEmail = "";
      state.checkToken = "";
    },
    loginToken(state) {
      state.loginUser = true;
    },
  },
  extraReducers: {
    [verificationTokenAsync.pending]: (state) => {
      state.message = "Token verification is underway";
    },
    [verificationTokenAsync.fulfilled]: (state, action) => {
      state.loginUser = true;
      state.message = "Successful authentication";
      state.userEmail = action.payload.data.email;
      state.userId = action.payload.data._id;
      state.checkToken = true;
    },
    [verificationTokenAsync.rejected]: (state, action) => {
      state.message = "Authentication error";
      state.loginUser = false;
      state.checkToken = false;
    },
  },
});
export const { logoutToken, loginToken } = checkTokenSlice.actions;
export default checkTokenSlice.reducer;
