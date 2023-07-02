import axios from "axios"
import { UserDataType } from "../types/Types"

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'c2b03c4a-03dd-4033-aa93-384d8f2e073f'
    }
})

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

export type GetUsersResponseType = {
    items: UserDataType[]
    totalCount: number
    error: string | null
}

export type APIResponseType<Data = {}, ResultCode = ResultCodesEnum> = {
    data: Data
    resultCode: ResultCode 
    messages: string[]
}




