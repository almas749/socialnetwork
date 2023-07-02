import { PhotosType, ProfileType } from "../types/Types";
import { instance, APIResponseType } from "./api";

export type SavePhotoResponseDataType = {
    photos: PhotosType
}

export const profileAPI = {
    async getProfile(userId: number | null) {
        return await instance
            .get<ProfileType>(`profile/${userId}`).then(response => response.data);
    },
    async getStatus(userId: number) {
        return await instance
            .get<string>(`profile/status/${userId}`).then(response => response.data);
    },
    async updateStatus(status: string) {
        return await instance
            .put<APIResponseType>(`profile/status`, { status }).then(response => response.data);
    },
    async savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return await instance
            .put<APIResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => response.data);
    },
    async saveProfile(profile: ProfileType) {
        return await instance
            .put<APIResponseType>(`profile`, profile).then(response => response.data);
    }
};
