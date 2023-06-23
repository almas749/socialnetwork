import { useEffect } from "react";
import { connect } from 'react-redux';
import { compose } from "@reduxjs/toolkit";
import { getUsers, setFollow } from '../../redux/reducers/usersReducer';
import { getCurrentPage, getFollowingInProgress, getIsLoading, getPageSize, getTotalUsersCount, getUsersData } from "../../redux/selectors/usersSelectors";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import Users from './Users';
import Preloader from "../common/Preloader/Preloader";

const UsersContainer = (props) => {

    useEffect(() => {
        props.getUsers(props.currentPage, props.pageSize);
    }, [])

    const onChangePage = (currentPage) => {
        props.getUsers(currentPage, props.pageSize);
    };

    const requestFollow = (userId, followed) => {
        props.setFollow(userId, followed);
    }

    return (
        <>
            {props.isLoading ?
                <Preloader /> : <Users
                    usersData={props.usersData}
                    pageSize={props.pageSize}
                    currentPage={props.currentPage}
                    totalUsersCount={props.totalUsersCount}
                    followingInProgress={props.followingInProgress}
                    onChangePage={onChangePage}
                    requestFollow={requestFollow} />}
        </>
    );

}

let mapStateToProps = (state) => {
    return {
        usersData: getUsersData(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        isLoading: getIsLoading(state),
        followingInProgress: getFollowingInProgress(state),
        totalUsersCount: getTotalUsersCount(state)
    }
}

export default compose(
    connect(mapStateToProps, { getUsers, setFollow }),
    withAuthRedirect
)(UsersContainer);

