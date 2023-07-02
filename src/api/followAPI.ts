import { instance, APIResponseType } from "./api";


export const followAPI = {
    async deleteFollow(id: number) {
        return await instance
            .delete<APIResponseType>(`follow/${id}`).then(response => response.data);
    },
    async postFollow(id: number) {
        return await instance
            .post<APIResponseType>(`follow/${id}`).then(response => response.data);
    }
};
