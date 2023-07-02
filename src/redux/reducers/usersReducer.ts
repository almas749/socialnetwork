import { BaseThunkType, InferActionsTypes } from "../reduxStore"
import { APIResponseType, ResultCodesEnum } from "../../api/api"
import { followAPI } from "../../api/followAPI"
import { usersAPI } from "../../api/usersAPI"
import { UserDataType } from "../../types/Types"

const initialState = {
    usersData: [] as UserDataType[] | [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isLoading: false,
    followingInProgress: null as number | null,
    filter: {term: '', friend: null as null | boolean}
}

export type InitialStateType = typeof initialState
export type FilterUsersReducerType = typeof initialState.filter

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case "SN/USERS/SWITCH_FOLLOW": {
            return {
                ...state,
                usersData: state.usersData.map((user: UserDataType) => {
                    if (user.id === action.payload as number) {
                        return { ...user, followed: !(user.followed) }
                    }
                    return user
                })
            }
        }
        case "SN/USERS/SET_USERS": {
            return {
                ...state,
                usersData: action.payload as UserDataType[]
            }
        }
        case "SN/USERS/CHANGE_PAGE": {
            return {
                ...state,
                currentPage: action.payload as number
            }
        }
        case "SN/USERS/SET_TOTAL_USERS_COUNT": {
            if (action.payload as number> 101) {
                return {
                    ...state,
                    totalUsersCount: 101
                }
            } else return {
                ...state,
                totalUsersCount: action.payload as number
            }
        }
        case "SN/USERS/SET_LOADING": {
            return {
                ...state,
                isLoading: action.payload as boolean
            }
        }
        case "SN/USERS/SET_FOLLOWING_IN_PROGRESS": {
            return {
                ...state,
                followingInProgress: action.payload as number
            }
        }
        case "SN/USERS/SET_FILTER": {
            return {
                ...state,
                filter: action.payload as FilterUsersReducerType
            }
        }
        default:
            return state
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    switchFollow: (userId: number) => ({
        type: "SN/USERS/SWITCH_FOLLOW",
        payload: userId
    }),
    setUsers: (users: UserDataType[]) => ({
        type: "SN/USERS/SET_USERS",
        payload: users
    }),
    changePage: (currentPage: number) => ({
        type: "SN/USERS/CHANGE_PAGE",
        payload: currentPage
    }),
    setLoading: (isLoading: boolean) => ({
        type: "SN/USERS/SET_LOADING",
        payload: isLoading
    }),
    setFollowingInProgress: (userId: number | null) => ({
        type: "SN/USERS/SET_FOLLOWING_IN_PROGRESS",
        payload: userId
    }),
    setTotalUsersCount: (totalUsersCount: number) => ({
        type: "SN/USERS/SET_TOTAL_USERS_COUNT",
        payload: totalUsersCount
    }),
    setFilter: (filter: FilterUsersReducerType) => ({
        type: 'SN/USERS/SET_FILTER',
        payload: filter
   })
}


type ThunkType = BaseThunkType<ActionsTypes>

export const getUsers = (currentPage: number, 
                        pageSize: number, filter: FilterUsersReducerType): ThunkType => async (dispatch, getState) => {

    dispatch(actions.setLoading(true))
    dispatch(actions.changePage(currentPage))
    dispatch(actions.setFilter(filter))

    const getUsersData = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)

    dispatch(actions.setLoading(false))
    dispatch(actions.setUsers(getUsersData.items))
    dispatch(actions.setTotalUsersCount(getUsersData.totalCount))
}

export const setFollow = (userId: number, followed: boolean): ThunkType => async (dispatch) => {
    const followSwitcher = (data: APIResponseType, userId: number) => {
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.switchFollow(userId))
        }
        dispatch(actions.setFollowingInProgress(null))
    }

    dispatch(actions.setFollowingInProgress(userId))
    let followData
    if (followed) {
        followData = await followAPI.deleteFollow(userId)
        followSwitcher(followData, userId)
    } else {
        followData = await followAPI.postFollow(userId)
        followSwitcher(followData, userId)
    }

}

export default usersReducer