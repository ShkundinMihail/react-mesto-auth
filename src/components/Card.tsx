import { useAppSelector, useAppDispatch } from "../hoocks/useStore";
import { putLikeCard, deleteLikeCard } from "../store/cardSlice";
import { popupImageOpen, popupDeleteCardOpen } from "../store/popupSlice";
import { ICardProps } from "../types/typeCards";
import { IUserInfo } from "../types/typeUsers";

export const Card = ({ data }: ICardProps) => {
  const { _id } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const isLiked = data.likes.some((i: IUserInfo) => i._id === _id);
  const owner = data.owner._id === _id;

  const handleClickDelete = () => {
    dispatch(popupDeleteCardOpen({ cardId: data._id }));
  };
  const handleClickCard = () => {
    dispatch(
      popupImageOpen({
        name: data.name,
        link: data.link,
        _id: data._id,
      })
    );
  };

  const handleLikeClick = () => {
    if (isLiked) {
      dispatch(deleteLikeCard({ cardId: data._id, isLiked, userId: _id }));
    } else {
      dispatch(putLikeCard({ cardId: data._id, isLiked, userId: _id }));
    }
  };
  return (
    <article className="element" lang="en ru" id={data._id}>
      <img
        className="element__photo"
        onError={(e) => {
          e.currentTarget.src =
            "https://media.tenor.com/XTzoRudAmN8AAAAi/perdido.gif";
        }}
        id="photo"
        src={data.link}
        onClick={handleClickCard}
        alt={data.name}
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
        <h2 className="element__title">{data.name}</h2>
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
      <span className="element__number-likes">{data.likes.length}</span>
    </article>
  );
};
