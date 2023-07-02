import { Navigate } from "react-router-dom"
import { connect } from "react-redux"
import { compose } from "@reduxjs/toolkit"
import { getAuthId, getIsAuth } from "../redux/selectors/authSelectors"
import { RootState } from "../redux/reduxStore"
import { ComponentType, FC } from "react"

let mapStateToPropsForRedirect = (state: RootState) => ({
    isAuth: getIsAuth(state),
    id: getAuthId(state)
})

type MapStatePropsType = {
    isAuth: boolean,
    id: number | null
}
type MapDispatchPropsType = {
}

export const withAuthRedirect = (Component: ComponentType<any>) => {
    const AuthRedirectComponent: FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
        if (!props.isAuth) return <Navigate to='/login' />
        return <Component {...props} />
    }
    return compose(connect(mapStateToPropsForRedirect, {}))(AuthRedirectComponent)
}