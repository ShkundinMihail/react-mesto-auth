import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL, BASE_HEADERS } from "../utils/constants";
import { ICard, toggleLikeArg, ICardSlice, INewCard, IPutLikeCard, ICardId } from "../types/typeCards";
import axios, { AxiosError } from "axios";

export const fetchCards = createAsyncThunk<ICard[], void, { rejectValue: AxiosError }>(
  "cards/fetchCards",
  async function (_, { rejectWithValue }) {
    try {
      const { data } = await axios.get(`${BASE_URL}/cards`, { headers: BASE_HEADERS })
      return (data) as ICard[];
    } catch (error: unknown) {
      return rejectWithValue(error as AxiosError);
    }
  }
);
export const putLikeCard = createAsyncThunk<toggleLikeArg, IPutLikeCard, { rejectValue: AxiosError }>(//первый что должно вернуться, вт аргументы, третий  thunkApiConfig
  "cards/putLikeCard",
  async function ({ cardId }, { rejectWithValue }) {
    try {
      const { data } = await axios(`${BASE_URL}/cards/${cardId}/likes`, { method: "PUT", headers: BASE_HEADERS });
      return { cardId, data } as toggleLikeArg;
    } catch (err: any) {
      return rejectWithValue(err as AxiosError);
    }
  }
);
export const deleteLikeCard = createAsyncThunk<toggleLikeArg, IPutLikeCard, { rejectValue: AxiosError }>(
  "cards/deleteLikeCard",
  async function ({ cardId }, { rejectWithValue }) {
    try {
      const { data } = await axios(`${BASE_URL}/cards/${cardId}/likes`, { method: "DELETE", headers: BASE_HEADERS, });
      return { cardId, data } as toggleLikeArg;
    } catch (err: unknown) {
      return rejectWithValue(err as AxiosError);
    }
  }
);
export const newCard = createAsyncThunk<ICard, INewCard, { rejectValue: AxiosError }>(
  "cards/newCard",
  async function ({ name, link }, { rejectWithValue }) {
    try {
      const { data } = await axios(`${BASE_URL}/cards`, {
        method: "POST",
        headers: BASE_HEADERS,
        data: { link, name }
      });
      return data as ICard
    } catch (err: any) {
      return (rejectWithValue(err as AxiosError));
    }
  }
);
export const deleteCard = createAsyncThunk<ICardId, ICardId, { rejectValue: AxiosError }>(
  "cards/deleteCard",
  async function ({ cardId }, { rejectWithValue }) {
    try {
      await axios(`${BASE_URL}/cards/${cardId}`, {
        method: "DELETE",
        headers: BASE_HEADERS,
      });
      return { cardId }
    } catch (err: unknown) {
      return rejectWithValue(err as AxiosError);
    }
  }
);

const cardSlice = createSlice({
  name: "cardsArray",
  initialState: {
    cardsArray: [],
    status: null,
    statusLike: null,
    error: null,
  } as ICardSlice,
  reducers: {
    deleteCardsFromMemoryAction(state) {
      state.cardsArray = [];
      state.status = null;
      state.statusLike = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //fetch cards 
      .addCase(fetchCards.pending, state => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.status = "resolved";
        state.cardsArray = action.payload;
      })
      .addCase(fetchCards.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'rejected';
        state.error = action.payload.message;
      })
      // like card
      .addCase(putLikeCard.pending, state => {
        state.statusLike = "loading"
      })
      .addCase(putLikeCard.fulfilled, (state, action) => {
        state.statusLike = "resolved"
        state.cardsArray = state.cardsArray.map((card) => {
          if (card._id === action.payload.cardId) {
            return action.payload.data;
          } else {
            return card;
          }
        });
      })
      .addCase(putLikeCard.rejected, state => {
        state.statusLike = "rejected"
      })
      // dislike card
      .addCase(deleteLikeCard.pending, state => {
        state.statusLike = "load"
      })
      .addCase(deleteLikeCard.fulfilled, (state, action) => {
        state.statusLike = "resolved"
        state.cardsArray = state.cardsArray.map((card) => {
          if (card._id === action.payload.cardId) {
            return action.payload.data;
          } else {
            return card;
          }
        });
      })
      .addCase(deleteLikeCard.rejected, state => {
        state.statusLike = "rejected"
      })
      // new card
      .addCase(newCard.pending, state => {
        state.error = null
      })
      .addCase(newCard.fulfilled, (state, action: PayloadAction<ICard>) => {
        state.cardsArray.unshift(action.payload)//state.cardsArray = [action.payload, ...state.cardsArray] //
      })
      .addCase(newCard.rejected, state => {
        // state.error = "rejected"
      })
      .addCase(deleteCard.pending, state => { })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.cardsArray = state.cardsArray.filter(
          ({ _id }) => _id !== action.payload.cardId
        );
      })
      .addCase(deleteCard.rejected, (state, action) => { })
  },
});

export const { deleteCardsFromMemoryAction } = cardSlice.actions;
export default cardSlice.reducer;
