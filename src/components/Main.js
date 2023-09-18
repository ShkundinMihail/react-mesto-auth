import { Card } from "../components/Card.js";
import iconEdit from "../images/edit-icon.svg";
import photoIcon from "../images/addPhoto-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";
import {
  popupEditUserOpen,
  popupEditAvatarOpen,
  popupAddCardOpen,
} from "../store/popupSlice.js";

export function Main() {
  const { status, error, cardsArray } = useSelector((state) => state.card);
  const { name, about, statusUser, avatar } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  return (
    <main className="content">
      <section className="profile">
        <div className="author">
          {statusUser !== "error when changing the avatar" ? (
            <img className="author__avatar" src={avatar} alt="author" />
          ) : (
            <span
              style={{
                color: "white",
                maxWidth: "120px",
                marginTop: "auto",
                marginBottom: "auto",
              }}
            >
              {statusUser}
            </span>
          )}
          <button
            className="author__avatar-button"
            onClick={() => {
              dispatch(popupEditAvatarOpen());
            }}
          ></button>
          <div className="author__info-zone">
            {statusUser === "error when changing the info" ||
            statusUser === "Error in user data" ? (
              <span className="author__info-zone-error">{statusUser}</span>
            ) : null}
            <div className="author__title-zone">
              <h1 className="author__name">{name}</h1>

              <button
                type="button"
                onClick={() => {
                  dispatch(popupEditUserOpen());
                }}
                className="author__edit"
              >
                <img
                  className="author__edit-icon"
                  src={iconEdit}
                  alt="изменить"
                />
              </button>
            </div>
            <p className="author__work">{about}</p>
          </div>
        </div>
        <button
          className="profile__add-photo"
          type="button"
          onClick={() => {
            dispatch(popupAddCardOpen());
          }}
        >
          <img
            className="profile__add-photo-icon"
            src={photoIcon}
            alt="добавить фото"
          />
        </button>
      </section>
      {status === "loading" && <Oval />}
      {status === "resolved" && (
        <section className="elements">
          {cardsArray.map((item) => (
            <Card key={item._id} data={item} />
          ))}
        </section>
      )}
      {status === "rejected" && <h2 style={{ color: "white" }}>{error}</h2>}
    </main>
  );
}
