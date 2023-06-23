import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'c2b03c4a-03dd-4033-aa93-384d8f2e073f'
    }
});

export const usersAPI = {
    async getUsers(currentPage = 1, pageSize = 10) {
        return await instance
            .get(`users?page=${currentPage}&count=${pageSize}`)
    }
}

export const followAPI = {
    async deleteFollow(id) {
        return await instance
            .delete(`follow/${id}`)
    },
    async postFollow(id) {
        return await instance
            .post(`follow/${id}`)
    }
}

export const profileAPI = {
    async getProfile(userId) {
        return await instance
            .get(`profile/${userId}`)
    },
    async getStatus(userId) {
        return await instance
            .get(`profile/status/${userId}`)
    },
    async updateStatus(status) {
        return await instance
            .put(`profile/status`, { status })
    }
}

export const authAPI = {
    async me() {
        return await instance
            .get(`auth/me`)
    },
    async login(email, password, rememberMe = false) {
        return await instance
            .post(`auth/login`, { email, password, rememberMe })
    },
    async logout() {
        return await instance
            .delete(`auth/login`);
    }
}





