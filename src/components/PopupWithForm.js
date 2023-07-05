import React from "react";
import closeIcon from '../images/Close-Icon.svg'

export function PopupWithForm(props) {
    const closePopupWhenClickingOnOverlay = (e) => {
        if (e.target.className === 'popup  popup_opened') {
            props.onClose()
        }
    };
    return (
        <div onClick={closePopupWhenClickingOnOverlay} className={`popup  ${props.popupOpen ? 'popup_opened' : ''}`}>
            <div className="popup__content">
                <button className="popup__close" type="button" ><img className="popup__close-icon" src={closeIcon} alt="Х" onClick={props.onClose} /></button>
                <h3 className="popup__title">{props.title}</h3>
                <form className="popup__author-edit" method="post" onSubmit={props.onSubmit}>
                    {props.children}
                    <button type="submit" className="popup__save">{props.submit}</button>
                </form>
            </div>
        </div>
    )
}
