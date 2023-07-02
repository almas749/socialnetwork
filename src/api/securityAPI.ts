import { instance } from "./api";

export type GetCaptchaUrlResponseType = {
    url: string
}

export const securityAPI = {
    async getCaptchaUrl() {
        return await instance
            .get<GetCaptchaUrlResponseType>(`security/get-captcha-url`).then(response => response.data);
    }
};
