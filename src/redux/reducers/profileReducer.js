import { profileAPI } from "../../api/api";
const ADD_POST = 'ADD-POST',
    SET_USER_PROFILE = 'SET-USER-PROFILE',
    SET_STATUS = 'SET-STATUS';

const initialState = {
    postsData: [
        {
            id: 1,
            message: 'Sup',
            likeCount: 10
        },
        {
            id: 2,
            message: 'How u doin',
            likeCount: 13
        },
        {
            id: 3,
            message: 'My name is alesha',
            likeCount: 2
        }
    ],
    profile: null,
    status: ''
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                postsData: [...state.postsData, {
                    id: state.postsData[state.postsData.length - 1].id + 1,
                    message: action.newPostText,
                    likeCount: 0
                }]
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            };
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }
        default:
            return state;
    }
}


export const addPostActionCreator = (newPostText) => ({
    type: ADD_POST,
    newPostText
});

const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE,
    profile
});

const setStatus = (status) => ({
    type: SET_STATUS,
    status
});

export const getProfile = (userId) => async (dispatch) => {
    const response = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
};

export const getStatus = (userId) => async (dispatch) => {
    const response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));
};

export const updateStatus = (status) => async (dispatch) => {
    const response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
};

export default profileReducer;