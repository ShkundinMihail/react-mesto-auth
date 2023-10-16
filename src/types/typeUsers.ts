export interface ITokenResponse {//объект ответа проверки токена
    email: string,
    _id: string
}
export interface ITokenState {//стэйт токена
    loginUser: boolean,
    message: string,
    userId: string,
    userEmail: string,
}
export interface IUserRegisterLogin {
    email: string,
    password: string
}
export interface IRegisterSlice {
    registerOk: boolean
    loginOk: boolean
}
export interface IUserInfo {
    name: string,
    about: string,
    avatar: string,
    _id: string,
    cohort: string
}
export interface IEditUser {
    name: string,
    about: string,
}
export interface IEditAvatar {
    avatar: string,
}
export interface IUserSlice {
    statusUser: string,
    error: string,
    name: string,
    about: string,
    avatar: string,
    _id: string,
    cohort: string,
}
export interface ISubmitUserProps {
    handleSubmitForm: ({ email, password }: IUserRegisterLogin) => void;
}