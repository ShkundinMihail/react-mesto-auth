/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import closeIcon from "../images/Close-Icon.svg";
import { useAppSelector, useAppDispatch } from "../hoocks/useStore";
import { popupImageClose, popupImageOpen } from "../store/popupSlice";
import style from "../blocks/popup/ImagePopup.module.css";
import { assigningClassToAnImagePopup } from "../utils/functions";
import { IPopupData } from "../types/typePopups";

export function ImagePopup() {
  const [clickNext, setClickNext] = useState(false); //все 4 стэйта для анимации при смене картинок
  const [clickBack, setClickBack] = useState(false);
  const [appNextCard, setAppNextCard] = useState(false);
  const [appBackCard, setAppBackCard] = useState(false);
  const { popupImageLink, popupImageTitle, popupImageVisible, popupImageId } =
    useAppSelector((state) => state.popup);
  const { cardsArray } = useAppSelector((state) => state.card);
  const dispatch = useAppDispatch();
  const makeKeyboardEvents = (e: any) => {
    //функция для с событий клавиатуры
    if (e.key === "Escape") {
      dispatch(popupImageClose());
    }
    if (e.key === "ArrowRight") {
      getNextCard();
    }
    if (e.key === "ArrowLeft") {
      getPrevCard();
    }
  };

  useEffect(() => {
    //отслеживает события клавиатуры
    document.addEventListener("keydown", makeKeyboardEvents, false);
    return () => {
      document.removeEventListener("keydown", makeKeyboardEvents, false);
    };
  }, [popupImageId]);
  const closePopupWhenClickingOnOverlay = (e: any): void => {
    //функция отслеживает нажатие вне зоны контента и закрывает попап
    if (e.target.className === "popup popup_photo popup_opened") {
      dispatch(popupImageClose());
    }
  };
  const indexCard = (): number => {
    //получает индекс открытой карточки
    return cardsArray.findIndex((i) => i._id === popupImageId);
  };
  const transmitData = (card: IPopupData) => {
    //функция которая передаёт в стор данные карточки
    dispatch(
      popupImageOpen({
        name: card.name,
        link: card.link,
        _id: card._id,
      })
    );
  };
  const nextCard = () => {
    //функция возвращает следующую карточку после текущей
    let num = indexCard() + 1;
    if (num > cardsArray.length - 1) {
      num = 0;
    }
    return cardsArray[num];
  };
  const previousCard = () => {
    //функция возвращает предыдущую карточку после текущей
    let num = indexCard() - 1;
    if (num < 0) {
      num = cardsArray.length - 1;
    }
    return cardsArray[num];
  };
  const getNextCard = () => {
    //функция 1.скрывает карточку 2.передает данные следующей карточки в стор 3. Открывает следующую карточку
    setClickNext(true);
    const card = nextCard();
    setTimeout(() => {
      setClickNext(false);
      transmitData(card);
      setAppNextCard(true);
      setTimeout(() => {
        setAppNextCard(false);
      }, 300);
    }, 300);
  };
  const getPrevCard = () => {
    //функция 1.скрывает карточку 2.передает данные предыдущей карточки в стор 3. Открывает предыдущую карточку
    setClickBack(true);
    const card = previousCard();
    setTimeout(() => {
      setClickBack(false);
      transmitData(card);
      setAppBackCard(true);
      setTimeout(() => {
        setAppBackCard(false);
      }, 300);
    }, 300);
  };

  return (
    <>
      <div
        onClick={closePopupWhenClickingOnOverlay}
        className={`popup popup_photo ${
          popupImageVisible ? "popup_opened" : ""
        }`}
      >
        <button
          className={style.scrollButtonBack}
          onClick={() => {
            getPrevCard();
          }}
        ></button>
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

          <div className={style.imageContainer}>
            <img
              className={assigningClassToAnImagePopup(
                clickNext,
                clickBack,
                appNextCard,
                appBackCard
              )}
              src={popupImageLink}
              alt={popupImageTitle}
              onError={(e) => {
                e.currentTarget.src =
                  "https://media.tenor.com/XTzoRudAmN8AAAAi/perdido.gif";
              }}
            />
          </div>
          <h2 className="popup__open-title">{popupImageTitle}</h2>
        </div>
        <button
          className={style.scrollButtonNext}
          onClick={() => {
            getNextCard();
          }}
        ></button>
      </div>
    </>
  );
}
