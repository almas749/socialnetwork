import { useEffect, FC } from "react"
import { connect } from 'react-redux'
import { compose } from "@reduxjs/toolkit"
import { FilterUsersReducerType, getUsers, setFollow } from '../../redux/reducers/usersReducer'
import { getCurrentPage, getFollowingInProgress, getIsLoading, getPageSize, getTotalUsersCount, getUsersData, getUsersFilter } from "../../redux/selectors/usersSelectors"
import { withAuthRedirect } from "../../hoc/withAuthRedirect"
import { UserDataType } from "../../types/Types"
import { RootState } from "../../redux/reduxStore"
import Users from './Users'
import Preloader from "../common/Preloader/Preloader"

type MapStatePropsType = {
    usersData: UserDataType[]
    currentPage: number
    pageSize: number
    isLoading: boolean
    followingInProgress: number | null
    totalUsersCount: number
    filter: FilterUsersReducerType
}

type MapDispatchPropsType = {
    getUsers: (currentPage: number, pageSize: number, filter: FilterUsersReducerType) => void
    setFollow: (userId: number, followed: boolean) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

const UsersContainer: FC<PropsType> = ({usersData, 
                                        currentPage, 
                                        pageSize, 
                                        isLoading, 
                                        followingInProgress, 
                                        totalUsersCount, 
                                        filter,
                                        getUsers, 
                                        setFollow}) => {

    useEffect(() => {
        getUsers(currentPage, pageSize, filter)
    }, [])

    const onChangePage = (currentPage: number) => {
        getUsers(currentPage, pageSize, filter)
    }

    const onFilterChanged = (filter: FilterUsersReducerType) => {
        getUsers(1, pageSize, filter)
    }

    const requestFollow = (userId: number, followed: boolean) => {
        setFollow(userId, followed)
    }

    return (
        <>
            {isLoading ?
                <Preloader /> : <Users
                    usersData={usersData}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    totalUsersCount={totalUsersCount}
                    filter={filter}
                    followingInProgress={followingInProgress}
                    onChangePage={onChangePage}
                    onFilterChanged={onFilterChanged}
                    requestFollow={requestFollow} />}
        </>
    )

}

let mapStateToProps = (state: RootState): MapStatePropsType => {
    return {
        usersData: getUsersData(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        isLoading: getIsLoading(state),
        followingInProgress: getFollowingInProgress(state),
        totalUsersCount: getTotalUsersCount(state),
        filter: getUsersFilter(state)
    }
}

export default compose<any>(
    connect<MapStatePropsType, MapDispatchPropsType, {}, RootState>(mapStateToProps, { getUsers, setFollow }),
    withAuthRedirect
)(UsersContainer)

