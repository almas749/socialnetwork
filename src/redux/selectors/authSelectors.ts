import { RootState } from "../reduxStore"

export const getAuthId = (state: RootState) => {
    return state.auth.id
}
export const getIsAuth = (state: RootState) => {
    return state.auth.isAuth
}
export const getCaptchaUrl = (state: RootState) => {
    return state.auth.captchaUrl
}
export const getAuthLogin = (state: RootState) => {
    return state.auth.login
}
export const getAuthEmail = (state: RootState) => {
    return state.auth.email
}


