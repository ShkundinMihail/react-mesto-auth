import { useEffect, useRef } from "react";
import { PopupWithForm } from "./PopupWithForm";
import { editUserAvatar } from "../store/userSlice";
import { useAppSelector, useAppDispatch } from "../hoocks/useStore";
import { popupEditAvatarClose } from "../store/popupSlice";

export function EditAvatarPopup() {
  const linkToAvatar = useRef<HTMLInputElement>(null!);
  const dispatch = useAppDispatch();
  const { popupEditUserAvatarVisible } = useAppSelector((state) => state.popup);
  useEffect(() => {
    linkToAvatar.current.value = "";
  }, [popupEditUserAvatarVisible]);
  const submitAvatar = (e: React.FormEvent<Element>) => {
    e.preventDefault();
    dispatch(editUserAvatar({ avatar: linkToAvatar.current.value }));
    dispatch(popupEditAvatarClose());
  };

  return (
    <PopupWithForm
      popupOpen={popupEditUserAvatarVisible}
      onClose={() => {
        dispatch(popupEditAvatarClose());
      }}
      onSubmit={submitAvatar}
      title={"Обновить аватар"}
      submit={"Сохранить"}
      children={
        <>
          <input
            ref={linkToAvatar}
            className="popup__input-style popup__input-style_edit_work"
            id="linkAvatar"
            required
            placeholder="Ссылка на аватар"
            type="url"
          />
          <span
            className="popup__form-error popup__form-error_from-avatar"
            id="linkAvatar-error"
          ></span>
        </>
      }
    />
  );
}
