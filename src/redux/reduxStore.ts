import { Action, combineReducers, configureStore } from '@reduxjs/toolkit';
import ThunkMiddleware, { ThunkAction } from 'redux-thunk';
import friendsReducer from './reducers/friendsReducer';
import dialogsReducer from './reducers/dialogsReducer';
import profileReducer from './reducers/profileReducer';
import usersReducer from './reducers/usersReducer';
import authReducer from './reducers/authReducer';
import appReducer from './reducers/appReducer';

let reducer = combineReducers({
        profilePage: profileReducer,
        dialogsPage: dialogsReducer,
        friendsData: friendsReducer,
        usersPage: usersReducer,
        auth: authReducer,
        app: appReducer
})

const store = configureStore({
    reducer, 
    middleware: [ThunkMiddleware]
});

// @ts-ignore
window.Storage = store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type BaseThunkType<ActionTypes extends Action,
   ReturnType = Promise<void>> = ThunkAction<ReturnType,
   RootState, unknown, ActionTypes>

export type InferActionsTypes<T> = T extends {
   [key: string]: (...args: any[]) => infer U
} ? U : never

export default store