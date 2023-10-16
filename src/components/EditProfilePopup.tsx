import React, { useEffect, useRef } from "react";
import { PopupWithForm } from "./PopupWithForm";
import { useAppSelector, useAppDispatch } from "../hoocks/useStore";
import { editUserInformation } from "../store/userSlice";
import { popupEditUserClose } from "../store/popupSlice";

export function EditProfilePopup() {
  const { name, about } = useAppSelector((state) => state.user);
  const { popupEditUserInfoVisible } = useAppSelector((state) => state.popup);
  const dispatch = useAppDispatch();
  const userName = useRef<HTMLInputElement>(null!);
  const userAbout = useRef<HTMLInputElement>(null!);
  useEffect(() => {
    userName.current.value = name;
    userAbout.current.value = about;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popupEditUserInfoVisible]);

  const submitProfile = (e: React.FormEvent<Element>): void => {
    e.preventDefault();
    if (userName.current.value !== name || userAbout.current.value !== about) {
      dispatch(
        editUserInformation({
          name: userName.current.value,
          about: userAbout.current.value,
        })
      );
    }
    dispatch(popupEditUserClose());
  };

  return (
    <PopupWithForm
      popupOpen={popupEditUserInfoVisible}
      onClose={() => {
        dispatch(popupEditUserClose());
      }}
      onSubmit={submitProfile}
      title={"Редактировать профиль"}
      submit={"Сохранить"}
      children={
        <>
          <input
            ref={userName}
            className="popup__input-style popup__input-style_edit_name"
            id="name"
            placeholder="Имя"
            type="text"
            minLength={2}
            maxLength={40}
            required
            data-valid-value="в поле «Имя» должно быть от 2 до
                40
                символов"
          />
          <span
            className="popup__form-error popup__form-error_position"
            id="name-error"
          ></span>
          <input
            ref={userAbout}
            className="popup__input-style popup__input-style_edit_work"
            id="work"
            placeholder="О себе"
            type="text"
            minLength={2}
            maxLength={30}
            required
            data-valid-value="в поле «О себе» должно быть от 2 до 200 символов"
          />
          <span className="popup__form-error" id="work-error"></span>
        </>
      }
    />
  );
}
