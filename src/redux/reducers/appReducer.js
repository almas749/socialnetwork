import { getAuthUserData } from "./authReducer";
const INIT_SUCCESS = 'INIT-SUCCESS';

const initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {

    switch (action.type) {
        case INIT_SUCCESS:
            return {
                ...state,
                initialized: true
            };
        default:
            return state;
    }
}

const initSuccess = () => ({
    type: INIT_SUCCESS
});

export const initApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
        .then(() => {
            dispatch(initSuccess());
        })
}

export default appReducer;