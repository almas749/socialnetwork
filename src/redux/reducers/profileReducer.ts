import { BaseThunkType, InferActionsTypes } from "../reduxStore"
import { ResultCodesEnum } from "../../api/api"
import { profileAPI } from "../../api/profileAPI"
import { PostType, ProfileType, PhotosType } from "../../types/Types"

const postsData: PostType[] = [
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
]

const initialState = {
    postsData,
    profile: null as ProfileType | null,
    status: '',
}

type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "SN/PROFILE/ADD_POST": {
            return {
                ...state,
                postsData: [...state.postsData, {
                    id: state.postsData[state.postsData.length - 1].id + 1,
                    message: action.payload as string,
                    likeCount: 0
                }]
            }
        }
        case "SN/PROFILE/SET_USER_PROFILE": {
            return {
                ...state,
                profile: action.payload as ProfileType
            }
        }
        case "SN/PROFILE/SET_STATUS": {
            return {
                ...state,
                status: action.payload as string
            }
        }
        case "SN/PROFILE/SAVE_PHOTO_SUCCESS": {
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.payload,
                } as ProfileType
            }
        }
        default:
            return state
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    addPostActionCreator: (newPostText: string) => ({
        type: "SN/PROFILE/ADD_POST",
        payload: newPostText
    }),
    setUserProfile: (profile: ProfileType) => ({
        type: "SN/PROFILE/SET_USER_PROFILE",
        payload: profile
    }),
    setStatus: (status: string) => ({
        type: "SN/PROFILE/SET_STATUS",
        payload: status
    }),
    savePhotoSuccess: (photos: PhotosType) => ({
        type: "SN/PROFILE/SAVE_PHOTO_SUCCESS",
        payload: photos
    })
}

type ThunkType = BaseThunkType<ActionsTypes>

export const getProfile = (userId: number | null): ThunkType => async (dispatch) => {
    const getProfileData = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(getProfileData))
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    const getStatusData = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(getStatusData))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {

    const updateStatusData = await profileAPI.updateStatus(status)
    if (updateStatusData.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setStatus(status))
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    const savePhotoData = await profileAPI.savePhoto(file)
    if ( savePhotoData.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.savePhotoSuccess(savePhotoData.data.photos))
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId: number | null = getState().auth.id
    const saveProfileData = await profileAPI.saveProfile(profile)
    if (saveProfileData.resultCode === ResultCodesEnum.Success) {
        await dispatch(getProfile(userId))
    } else {
        return Promise.reject(saveProfileData.messages[0])
    }
}

export default profileReducer