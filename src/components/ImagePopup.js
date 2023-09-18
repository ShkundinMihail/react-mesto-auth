import React from "react";
import closeIcon from "../images/Close-Icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { popupImageClose } from "../store/popupSlice";

export function ImagePopup() {
  const { popupImageLink, popupImageTitle, popupImageVisible } = useSelector(
    (state) => state.popup
  );
  const dispatch = useDispatch();
  const closePopupWhenClickingOnOverlay = (e) => {
    if (e.target.className === "popup popup_photo popup_opened") {
      dispatch(popupImageClose());
    }
  };

  return (
    <>
      <div
        onClick={closePopupWhenClickingOnOverlay}
        className={`popup popup_photo ${
          popupImageVisible ? "popup_opened" : ""
        }`}
      >
        <div className="popup__content-photo">
          <button
            className="popup__close"
            onClick={() => {
              dispatch(popupImageClose());
            }}
            id="close-photo-popup"
            type="button"
            name="close-popup"
          >
            <img className="popup__close-icon" src={closeIcon} alt="Х" />
          </button>
          <img
            className="popup__open-photo"
            src={popupImageLink}
            alt={popupImageTitle}
          />
          <h2 className="popup__open-title">{popupImageTitle}</h2>
        </div>
      </div>
    </>
  );
}
