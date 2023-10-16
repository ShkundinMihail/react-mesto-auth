import { PopupWithForm } from "./PopupWithForm";
import { useAppSelector, useAppDispatch } from "../hoocks/useStore";
import { deleteCard } from "../store/cardSlice";
import { popupDeleteCardClose } from "../store/popupSlice";

export const DeleteCardPopup = () => {
  const { popupDeleteCardVisible } = useAppSelector((state) => state.popup);
  const { IdCardBeingDeleted } = useAppSelector((state) => state.popup);
  const dispatch = useAppDispatch();
  const onClose = () => {
    dispatch(popupDeleteCardClose());
  };
  const onSubmit = (e: React.FormEvent<Element>) => {
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
