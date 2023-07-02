import { RootState } from "../reduxStore"

export const getProfileState = (state: RootState) => {
    return state.profilePage.profile
}
export const getStatusState = (state: RootState) => {
    return state.profilePage.status
}
export const getPostsData = (state: RootState) => {
    return state.profilePage.postsData
}
