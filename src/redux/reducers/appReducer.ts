import { InferActionsTypes, BaseThunkType } from "../reduxStore"
import { getAuthUserData } from "./authReducer"

type InitialStateType = {
    initialized: boolean
}

const initialState: InitialStateType = {
    initialized: false
}

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case "SN/APP/INIT_SUCCESS":
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    initSuccess: () => ({
        type: "SN/APP/INIT_SUCCESS"
    })
}

type ThunkType = BaseThunkType<ActionsTypes>

export const initApp = (): ThunkType => async (dispatch) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(actions.initSuccess())
        })
}

export default appReducer