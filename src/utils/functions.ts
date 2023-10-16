
export const assigningClassToAnImagePopup = (//функция которая принимает boolean и возвращает строку в className открытой карточки
  clickNext: boolean,
  clickBack: boolean,
  appNextCard: boolean,
  appBackCard: boolean
): string => {
  if (clickNext) {
    return "popup__open-photo popup__open-photo_next ";
  } else if (clickBack) {
    return "popup__open-photo popup__open-photo_previous";
  } else if (appNextCard) {
    return "popup__open-photo popup__open-photo_next-app";
  } else if (appBackCard) {
    return "popup__open-photo popup__open-photo_previous-app";
  } else {
    return "popup__open-photo";
  }
};

export function handleError(status: number): void {
  switch (status) {
    case 400:
      console.log(1)
      throw new Error("Bad Request");
    case 403:
      throw new Error("Forbidden");
    case 404:
      throw new Error("Not Found ");
    case 405:
      throw new Error("Method Not Allowed");
    case 409:
      throw new Error("Conflict");
    default: break
  }
}
