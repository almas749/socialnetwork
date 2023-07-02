import { FC } from "react"
import { UserDataType } from "../../types/Types"
import UsersItem from "./UsersItem/UsersItem"
import UsersSearchForm from "./UsersSearchForm"
import './Users.css'
import Paginator from "./Paginator"
import { FilterUsersReducerType } from "../../redux/reducers/usersReducer"

type PropsType = {
    usersData: UserDataType[]
    pageSize: number
    currentPage: number 
    totalUsersCount: number 
    followingInProgress: number | null 
    filter: FilterUsersReducerType
    onChangePage: (currentPage: number) => void 
    onFilterChanged: (filter: FilterUsersReducerType) => void
    requestFollow: (userId: number, followed: boolean) => void
}

const Users: FC<PropsType> = ({ usersData, 
                                pageSize, 
                                currentPage, 
                                totalUsersCount, 
                                followingInProgress, 
                                filter,
                                onChangePage,
                                onFilterChanged,
                                requestFollow }) => {

    let onSwitchFollow = (userId: number, followed: boolean) => {
        requestFollow(userId, followed)
    }

    return (
        <div>
            <h3>Users</h3>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
            <Paginator
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onChangePage={onChangePage} />
            <ul className="users-wrapper">
                {
                    usersData.map((user, i) => <UsersItem
                        key={i}
                        id={user.id}
                        name={user.name}
                        followed={user.followed}
                        photo={user.photos.small}
                        status={user.status}
                        onSwitchFollow={onSwitchFollow}
                        followingInProgress={followingInProgress} />)
                }
            </ul>
        </div>
    )

}

export default Users