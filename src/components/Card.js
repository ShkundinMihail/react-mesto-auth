import { useSelector, useDispatch } from "react-redux";
import { putLikeCard, deleteLikeCard } from "../store/cardSlice";
import { popupImageOpen, popupDeleteCardOpen } from "../store/popupSlice";

export function Card(props) {
  const { _id } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const isLiked = props.data.likes.some((i) => i._id === _id);
  const owner = props.data.owner._id === _id;

  const handleClickDelete = () => {
    dispatch(popupDeleteCardOpen({ cardId: props.data._id }));
  };
  const handleClickCard = () => {
    dispatch(popupImageOpen({ title: props.data.name, link: props.data.link }));
  };

  const handleLikeClick = () => {
    if (isLiked) {
      dispatch(
        deleteLikeCard({ cardId: props.data._id, isLiked, userId: _id })
      );
    } else {
      dispatch(putLikeCard({ cardId: props.data._id, isLiked, userId: _id }));
    }
  };

  return (
    <article className="element" lang="en ru" id={props.data_id}>
      <img
        className="element__photo"
        id="photo"
        src={props.data.link}
        onClick={handleClickCard}
        alt={props.data.alt}
      />
      {owner && (
        <button
          className="element__delete-button"
          type="button"
          id="deletePhoto"
          onClick={handleClickDelete}
        ></button>
      )}
      <div className="element__text-zone">
        <h2 className="element__title">{props.data.name}</h2>
      </div>

      <button
        className={
          isLiked ? "element__like element__like_active" : "element__like"
        }
        type="button"
        name="like"
        onClick={() => {
          handleLikeClick();
        }}
      ></button>

      <span className="element__number-likes">{props.data.likes.length}</span>
    </article>
  );
}
