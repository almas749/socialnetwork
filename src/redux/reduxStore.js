import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import ThunkMiddleware from 'redux-thunk';
import friendsReducer from './reducers/friendsReducer';
import dialogsReducer from './reducers/dialogsReducer';
import profileReducer from './reducers/profileReducer';
import usersReducer from './reducers/usersReducer';
import authReducer from './reducers/authReducer';
import appReducer from './reducers/appReducer';

let store = configureStore({
    reducer: {
        profilePage: profileReducer,
        dialogsPage: dialogsReducer,
        friendsData: friendsReducer,
        usersPage: usersReducer,
        auth: authReducer,
        app: appReducer
    }
}, applyMiddleware(ThunkMiddleware));

window.Storage = store;

export default store;