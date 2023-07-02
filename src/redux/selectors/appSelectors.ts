import { RootState } from "../reduxStore"

export const getInitializedState = (state: RootState) => {
    return state.app.initialized
}


