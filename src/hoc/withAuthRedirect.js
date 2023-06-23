import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "@reduxjs/toolkit";
import { getAuthId, getIsAuth } from "../redux/selectors/authSelectors";

let mapStateToPropsForRedirect = (state) => ({
    isAuth: getIsAuth(state),
    id: getAuthId(state)
});

export const withAuthRedirect = (Component) => {
    const AuthRedirectComponent = (props) => {
        if (!props.isAuth) return <Navigate to='/login' />;
        return <Component {...props} />
    }
    return compose(connect(mapStateToPropsForRedirect))(AuthRedirectComponent);
}