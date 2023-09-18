import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    popupImageVisible: false,
    popupImageLink: null,
    popupImageTitle: null,
    //
    popupEditUserInfoVisible: false,
    popupEditUserAvatarVisible: false,
    popupAddCardVisible: false,
    //
    popupDeleteCardVisible: false,
    IdCardBeingDeleted: "",
    //
    infoTooltipVisible: false,
    infoTooltipText: "",
    infoTooltipImage: null,
  },
  reducers: {
    popupImageOpen(state, action) {
      state.popupImageVisible = true;
      state.popupImageLink = action.payload.link;
      state.popupImageTitle = action.payload.title;
    },
    popupImageClose(state) {
      state.popupImageVisible = false;
      state.popupImageLink = null;
      state.popupImageTitle = null;
    },
    popupEditUserOpen(state) {
      state.popupEditUserInfoVisible = true;
    },
    popupEditUserClose(state) {
      state.popupEditUserInfoVisible = false;
    },
    popupEditAvatarOpen(state) {
      state.popupEditUserAvatarVisible = true;
    },
    popupEditAvatarClose(state) {
      state.popupEditUserAvatarVisible = false;
    },
    popupAddCardOpen(state) {
      state.popupAddCardVisible = true;
    },
    popupAddCardClose(state) {
      state.popupAddCardVisible = false;
    },
    popupDeleteCardOpen(state, action) {
      state.popupDeleteCardVisible = true;
      state.IdCardBeingDeleted = action.payload.cardId;
    },
    popupDeleteCardClose(state) {
      state.popupDeleteCardVisible = false;
      state.IdCardBeingDeleted = "";
    },
    popupInfoTooltipOpen(state, action) {
      state.infoTooltipVisible = true;
      state.infoTooltipText = action.payload.text;
      state.infoTooltipImage = action.payload.image;
    },
    popupInfoTooltipClose(state) {
      state.infoTooltipVisible = false;
      state.infoTooltipText = "";
      state.infoTooltipImage = null;
    },
  },
});

export const {
  popupImageOpen,
  popupImageClose,
  popupEditUserOpen,
  popupEditUserClose,
  popupEditAvatarOpen,
  popupEditAvatarClose,
  popupAddCardOpen,
  popupAddCardClose,
  popupDeleteCardClose,
  popupDeleteCardOpen,
  popupInfoTooltipOpen,
  popupInfoTooltipClose,
} = popupSlice.actions;
export default popupSlice.reducer;
