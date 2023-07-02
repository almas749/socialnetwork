import { instance, APIResponseType, ResultCodesEnum, ResultCodeForCaptcha } from "./api";

export type MeResponseDataType = {
    id: number
    email: string
    login: string
}

export type LoginResponseDataType = {
    userId: number
}

type LoginResultCode = ResultCodesEnum | ResultCodeForCaptcha

export const authAPI = {
    async me() {
        return await instance
            .get<APIResponseType<MeResponseDataType>>(`auth/me`).then(response => response.data);
    },
    async login(email: string, password: string, rememberMe: boolean = false, captcha: boolean | null = null) {
        return await instance
            .post<APIResponseType<LoginResponseDataType, LoginResultCode>>(`auth/login`, { email, password, rememberMe, captcha }).then(response => response.data);
    },
    async logout() {
        return await instance
            .delete(`auth/login`).then(response => response.data);
    }
};
