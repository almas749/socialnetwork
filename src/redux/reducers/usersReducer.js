import { usersAPI, followAPI } from "../../api/api";
const SWITCH_FOLLOW = 'SWITCH-FOLLOW',
    SET_USERS = 'SET-USERS',
    CHANGE_PAGE = 'CHANGE-PAGE',
    SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT',
    SET_LOADING = 'SET-LOADING',
    SET_FOLLOWING_IN_PROGRESS = 'SET-FOLLOWING-IN-PROGRESS';

const initialState = {
    usersData: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isLoading: false,
    followingInProgress: null
};

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case SWITCH_FOLLOW: {
            return {
                ...state,
                usersData: state.usersData.map(user => {
                    if (user.id === action.userId) {
                        return { ...user, followed: !(user.followed) }
                    }
                    return user;
                })
            };
        }
        case SET_USERS: {
            return {
                ...state,
                usersData: action.users
            };
        }
        case CHANGE_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            };
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        }
        case SET_LOADING: {
            return {
                ...state,
                isLoading: action.isLoading
            }
        }
        case SET_FOLLOWING_IN_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.userId
            }
        }
        default:
            return state;
    }
}

const switchFollow = (userId) => ({
    type: SWITCH_FOLLOW,
    userId
});

const setUsers = (users) => ({
    type: SET_USERS,
    users
});

const changePage = (currentPage) => ({
    type: CHANGE_PAGE,
    currentPage
});

const setLoading = (isLoading) => ({
    type: SET_LOADING,
    isLoading
});

const setFollowingInProgress = (userId) => ({
    type: SET_FOLLOWING_IN_PROGRESS,
    userId
});

const setTotalUsersCount = (totalUsersCount) => ({
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount
});

export const getUsers = (currentPage, pageSize) => async (dispatch) => {
    dispatch(setLoading(true));

    const response = await usersAPI.getUsers(currentPage, pageSize);

    dispatch(changePage(currentPage));
    dispatch(setLoading(false));
    dispatch(setUsers(response.data.items))
    dispatch(setTotalUsersCount(response.data.totalCount));
}

export const setFollow = (userId, followed) => async (dispatch) => {
    const followSwitcher = (data, userId) => {
        if (data.resultCode === 0) {
            dispatch(switchFollow(userId));
        }
        dispatch(setFollowingInProgress(null));
    }

    dispatch(setFollowingInProgress(userId));
    let response;
    if (followed) {
        response = await followAPI.deleteFollow(userId)
        followSwitcher(response.data, userId)
    } else {
        response = await followAPI.postFollow(userId)
        followSwitcher(response.data, userId);
    }

}

export default usersReducer;