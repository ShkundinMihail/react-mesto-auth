import { IUserInfo } from "./typeUsers"

export interface IPutLikeCard {//для async function поставить или удалить лайк
    cardId: string,
    isLiked: boolean,//можно было обойтись без этих двух
    userId: string//ну и ладно...
}

export interface ICard {//карточка
    createdAt: string,
    likes: IUserInfo[],
    link: string,
    name: string,
    owner: IUserInfo,
    _id: string
}
export interface ICardProps {
    data: ICard
}
export interface toggleLikeArg {//карточка которую возвращает бэк в ответе на лайк и id
    data: ICard,
    cardId: string
}
export interface IErrorObj {//универсальный объект с ошибкой 
    body: any,
    bodyUsed: boolean,
    headers: any,
    ok: boolean,
    redirected: boolean,
    status: number,
    statusText: string,
    type: string,
}
export interface INewCard {//передается бэку для создания новой карточки
    name: string,
    link: string,
}
export interface ICardSlice {//стэйты редюсера 
    cardsArray: Array<ICard>,
    status: null | string,
    statusLike: null | string,
    error: null | string,
}

export interface ICardId {//для удаления карточки 
    cardId: string
}
export interface IErrorAxios {
    code: string,
    config: any
    message: string,
    name: string,
    request: any,
    response: {
        config: any,
        data: string,
        headers: string,
        request: any,
        status: number,
        statusText: string
    },
    stack: string

}
export interface IErrorRejectedWithValue {
    meta: string | undefined,
    payload: IErrorAxios
}