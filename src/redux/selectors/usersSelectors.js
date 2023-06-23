export const getUsersData = (state) => {
    return state.usersPage.usersData;
}
export const getPageSize = (state) => {
    return state.usersPage.pageSize;
}
export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
}
export const getIsLoading = (state) => {
    return state.usersPage.isLoading;
}
export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress;
}
export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount;
}

