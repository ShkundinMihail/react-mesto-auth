import React from "react";
import { PopupWithForm } from "./PopupWithForm";
import { newCard } from "../store/cardSlice";
import { useDispatch, useSelector } from "react-redux";
import { popupAddCardClose } from "../store/popupSlice";

export function AddPlacePopup() {
  const titlePlace = React.useRef("");
  const linkPlace = React.useRef("");
  const { popupAddCardVisible } = useSelector((state) => state.popup);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      newCard({
        name: titlePlace.current.value,
        link: linkPlace.current.value,
      })
    );
    dispatch(popupAddCardClose());
  };

  React.useEffect(() => {
    titlePlace.current.value = "";
    linkPlace.current.value = "";
  }, [popupAddCardVisible]);

  return (
    <PopupWithForm
      popupOpen={popupAddCardVisible}
      onClose={() => {
        dispatch(popupAddCardClose());
      }}
      onSubmit={handleSubmit}
      title={"Новое место"}
      submit={"Создать"}
      children={
        <>
          <input
            ref={titlePlace}
            className="popup__input-style popup__input-style_edit_name"
            id="titlePhoto"
            required
            placeholder="Название"
            type="text"
            minLength="2"
            maxLength="30"
            data-valid-value="в поле «Название» должно быть от 2 до
             30 символов"
          />
          <span
            className="popup__form-error popup__form-error_position"
            id="titlePhoto-error"
          ></span>
          <input
            ref={linkPlace}
            className="popup__input-style popup__input-style_edit_work"
            id="linkPhoto"
            minLength="2"
            maxLength="400"
            required
            placeholder="Ссылка на картинку"
            type="url"
          />
          <span className="popup__form-error" id="linkPhoto-error"></span>
        </>
      }
    />
  );
}
