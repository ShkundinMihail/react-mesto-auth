import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  IPopupData,
  IPopupDeleteAction,
  IPopupInfoTooltip,
  IPopupSlice,
} from "../types/typePopups";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    popupImageVisible: false,
    popupImageLink: "",
    popupImageTitle: "",
    popupImageId: "",
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
    infoTooltipImage: "",
  } as IPopupSlice,
  reducers: {
    popupImageOpen(state, action: PayloadAction<IPopupData>) {
      state.popupImageVisible = true;
      state.popupImageLink = action.payload.link;
      state.popupImageTitle = action.payload.name;
      state.popupImageId = action.payload._id;
    },
    popupImageClose(state) {
      state.popupImageVisible = false;
      state.popupImageLink = "";
      state.popupImageTitle = "";
      state.popupImageId = "";
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
    popupDeleteCardOpen(state, action: PayloadAction<IPopupDeleteAction>) {
      state.popupDeleteCardVisible = true;
      state.IdCardBeingDeleted = action.payload.cardId;
    },
    popupDeleteCardClose(state) {
      state.popupDeleteCardVisible = false;
      state.IdCardBeingDeleted = "";
    },
    popupInfoTooltipOpen(state, action: PayloadAction<IPopupInfoTooltip>) {
      state.infoTooltipVisible = true;
      state.infoTooltipText = action.payload.text;
      state.infoTooltipImage = action.payload.image;
    },
    popupInfoTooltipClose(state) {
      state.infoTooltipVisible = false;
      state.infoTooltipText = "";
      state.infoTooltipImage = "";
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
