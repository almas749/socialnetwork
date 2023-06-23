import UsersItem from "./UsersItem/UsersItem";
import './Users.css';
import Paginator from "./Paginator";

const Users = ({ usersData, pageSize, currentPage, totalUsersCount, followingInProgress, onChangePage, requestFollow }) => {

    let onSwitchFollow = (userId, followed) => {
        requestFollow(userId, followed);
    };

    return (
        <div>
            <h3>Users</h3>
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
    );

}

export default Users;