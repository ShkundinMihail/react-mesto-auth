import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, BASE_HEADERS } from "../utils/constants";

export const fetchCards = createAsyncThunk(
  "cards/fetchCards",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(`${BASE_URL}/cards`, {
        method: "GET",
        headers: BASE_HEADERS,
      });
      if (!response.ok) {
        throw new Error("Server error");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const putLikeCard = createAsyncThunk(
  "cards/putLikeCard",
  async function ({ cardId }, { rejectWithValue, dispatch }) {
    try {
      const res = await fetch(`${BASE_URL}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: BASE_HEADERS,
      });
      if (!res.ok) {
        throw new Error("error. Failled like");
      }
      const data = await res.json();

      dispatch(toggleLikeAction({ cardId, data }));
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const deleteLikeCard = createAsyncThunk(
  "cards/putLikeCard",
  async function ({ cardId }, { rejectWithValue, dispatch }) {
    try {
      const res = await fetch(`${BASE_URL}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: BASE_HEADERS,
      });
      if (!res.ok) {
        throw new Error("error. Failled like");
      }
      const data = await res.json();
      dispatch(toggleLikeAction({ cardId, data }));
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const newCard = createAsyncThunk(
  "cards/newCard",
  async function ({ name, link }, { rejectWithValue, dispatch }) {
    try {
      const res = await fetch(`${BASE_URL}/cards`, {
        method: "POST",
        headers: BASE_HEADERS,
        body: JSON.stringify({ link, name }),
      });
      if (!res) {
        throw new Error("Error loading a new card");
      }
      const data = await res.json();
      dispatch(newCardAction(data));
    } catch (err) {
      rejectWithValue(err.message);
    }
  }
);
export const deleteCard = createAsyncThunk(
  "cards/deleteCard",
  async function ({ cardId }, { rejectWithValue, dispatch }) {
    try {
      const res = await fetch(`${BASE_URL}/cards/${cardId}`, {
        method: "DELETE",
        headers: BASE_HEADERS,
      });
      if (!res) {
        throw new Error("Error remove card");
      }
      dispatch(deleteCardAction({ cardId }));
    } catch (err) {
      rejectWithValue(err.message);
    }
  }
);
const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};
const cardSlice = createSlice({
  name: "cardsArray",
  initialState: {
    cardsArray: [],
    status: null,
    statusLike: null,
    error: null,
  },
  reducers: {
    toggleLikeAction(state, action) {
      state.cardsArray = state.cardsArray.map((card) => {
        if (card._id === action.payload.cardId) {
          //rabid mutant
          return action.payload.data;
        } else {
          return card;
        }
      });
    },
    newCardAction(state, action) {
      state.cardsArray.unshift(action.payload);
    },
    deleteCardAction(state, action) {
      state.cardsArray = state.cardsArray.filter(
        ({ _id }) => _id !== action.payload.cardId
      );
    },
    deleteCardsFromMemoryAction(state) {
      state.cardsArray = [];
      state.status = null;
      state.statusLike = null;
      state.error = null;
    },
  },
  extraReducers: {
    [fetchCards.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [putLikeCard.pending]: (state) => {
      state.statusLike = "loading";
      state.error = null;
    },
    [fetchCards.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.cardsArray = action.payload;
    },
    [putLikeCard.fulfilled]: (state, action) => {
      state.status = "resolved";
    },
    [fetchCards.rejected]: setError,
    [putLikeCard.rejected]: setError,
    [deleteLikeCard.rejected]: setError,
    [newCard.rejected]: setError,
    [deleteCard.rejected]: setError,
  },
});
const { toggleLikeAction, newCardAction, deleteCardAction } = cardSlice.actions;
export const { deleteCardsFromMemoryAction } = cardSlice.actions;
export default cardSlice.reducer;
