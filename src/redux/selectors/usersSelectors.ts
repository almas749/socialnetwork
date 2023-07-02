import { RootState } from "../reduxStore"

export const getUsersData = (state: RootState) => {
    return state.usersPage.usersData
}
export const getPageSize = (state: RootState) => {
    return state.usersPage.pageSize
}
export const getCurrentPage = (state: RootState) => {
    return state.usersPage.currentPage
}
export const getIsLoading = (state: RootState) => {
    return state.usersPage.isLoading
}
export const getFollowingInProgress = (state: RootState) => {
    return state.usersPage.followingInProgress
}
export const getTotalUsersCount = (state: RootState) => {
    return state.usersPage.totalUsersCount
}
export const getUsersFilter = (state: RootState) => {
    return state.usersPage.filter
}

