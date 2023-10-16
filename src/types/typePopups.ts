export interface IPopupProps {
    popupOpen: boolean,
    onClose: () => void,
    onSubmit: (e: React.FormEvent) => void
    title: string,
    submit: string,
    children?: any
}
export interface IPopupData {
    name: string,
    link: string,
    _id: string,
}
export interface IPopupDeleteAction {
    cardId: string
}
export interface IPopupInfoTooltip {
    image: string,
    text: string
}
export interface IPopupSlice {
    popupImageVisible: boolean,
    popupImageLink: string,
    popupImageTitle: string,
    popupImageId: string,
    //
    popupEditUserInfoVisible: boolean,
    popupEditUserAvatarVisible: boolean,
    popupAddCardVisible: boolean,
    //
    popupDeleteCardVisible: boolean,
    IdCardBeingDeleted: string,
    //
    infoTooltipVisible: boolean,
    infoTooltipText: string,
    infoTooltipImage: string,
}