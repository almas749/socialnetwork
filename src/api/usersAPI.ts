import { instance, GetUsersResponseType } from "./api";


export const usersAPI = {
    async getUsers(currentPage: number = 1, pageSize: number = 10, term: string = '', friend: null | boolean = null) {
        return await instance
            .get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}` 
                + (term === '' ? '' : `&term=${term}`)
                + (friend === null ? '' : `&friend=${friend}`)).then(response => response.data);
    }
};
