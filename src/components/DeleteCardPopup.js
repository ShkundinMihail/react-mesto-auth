import { PopupWithForm } from "./PopupWithForm";
import { useDispatch, useSelector } from "react-redux";
import { deleteCard } from "../store/cardSlice";
import { popupDeleteCardClose } from "../store/popupSlice";

export const DeleteCardPopup = () => {
  const { popupDeleteCardVisible } = useSelector((state) => state.popup);
  const { IdCardBeingDeleted } = useSelector((state) => state.popup);
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(popupDeleteCardClose());
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteCard({ cardId: IdCardBeingDeleted }));
    onClose();
  };
  return (
    <PopupWithForm
      popupOpen={popupDeleteCardVisible}
      onClose={onClose}
      onSubmit={onSubmit}
      title={"Вы уверены?"}
      submit={"Тьма поглотила меня..."}
    />
  );
};
