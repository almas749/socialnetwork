import { RootState } from "../reduxStore"

export const getFriendsData = (state: RootState) => {
    return state.friendsData
}
export const getDialogsPageState = (state: RootState) => {
    return state.dialogsPage
}
