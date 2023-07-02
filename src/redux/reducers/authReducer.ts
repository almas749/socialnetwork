import { BaseThunkType, InferActionsTypes } from "../reduxStore"
import { ResultCodeForCaptcha, ResultCodesEnum } from "../../api/api"
import { securityAPI } from "../../api/securityAPI"
import { authAPI } from "../../api/authAPI"

const initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case 'SN/AUTH/SET_AUTH_USER_DATA':
        case 'SN/AUTH/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    setAuthUserData: (id: number | null, 
                        email: string | null, 
                        login: string | null, 
                        isAuth: boolean, 
                        captchaUrl: string | null) => ({
        type: "SN/AUTH/SET_AUTH_USER_DATA",
        payload: { id, email, login, isAuth, captchaUrl }
    }),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: "SN/AUTH/GET_CAPTCHA_URL_SUCCESS",
        payload: { captchaUrl }
    })
}

type ThunkType = BaseThunkType<ActionsTypes>

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    const meData = await authAPI.me()
    if (meData.resultCode === ResultCodesEnum.Success) {
        const { id, email, login } = meData.data
        dispatch(actions.setAuthUserData(id, email, login, true, null))
    }
}

export const login = (email: string, 
                    password: string, 
                    rememberMe: boolean, 
                    captcha: any): ThunkType => async (dispatch) => {
    const loginData = await authAPI.login(email, password, rememberMe, captcha)
    if (loginData.resultCode === ResultCodesEnum.Success) {
        await dispatch(getAuthUserData())
    } else {
        if (loginData.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            await dispatch(getCaptchaUrl())
        }
        return Promise.reject(loginData.messages[0])
    }
}

export const getCaptchaUrl = (): ThunkType  => async (dispatch) => {
    const getCaptchaUrlData = await securityAPI.getCaptchaUrl()
    const captchaUrl = getCaptchaUrlData.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export const logout = (): ThunkType => async (dispatch) => {
    const logoutData = await authAPI.logout()
    if (logoutData.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false, null))
    }
}

export default authReducer