import closeIcon from "../images/Close-Icon.svg";
import { useAppSelector, useAppDispatch } from "../hoocks/useStore";
import { popupInfoTooltipClose } from "../store/popupSlice";

export function InfoTooltip() {
  const { infoTooltipVisible, infoTooltipText, infoTooltipImage } =
    useAppSelector((state) => state.popup);
  const dispatch = useAppDispatch();
  return (
    <div className={`popup  ${infoTooltipVisible ? "popup_opened" : ""}`}>
      <div className="popup__content">
        <button className="popup__close" type="button">
          <img
            className="popup__close-icon"
            src={closeIcon}
            alt="Х"
            onClick={() => {
              dispatch(popupInfoTooltipClose());
            }}
          />
        </button>
        <img
          className="popup__image-authorization"
          src={infoTooltipImage}
          alt="результат авторизации"
        ></img>
        <h3 className="popup__title popup__title_text-align">
          {infoTooltipText}
        </h3>
      </div>
    </div>
  );
}
