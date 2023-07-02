import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/reduxStore'
import FriendsItem from './FriendsItem/FriendsItem'
import './Navbar.css'

const Navbar: FC = () => {

    const friendsData = useSelector((state: RootState) => state.friendsData)

    const activeLink = "app-nav-item__link app-nav-item__link--active"
    const normalLink = "app-nav-item__link"

    return (
        <nav className='app-nav'>
            <ul>
                <li className='app-nav-item'>
                    <NavLink
                        className={({ isActive }) => (isActive ? activeLink : normalLink)}
                        to="/profile" end>
                        Profile
                    </NavLink>
                </li>
                <li className='app-nav-item'>
                    <NavLink
                        className={({ isActive }) => (isActive ? activeLink : normalLink)}
                        to="/dialogs">
                        Messages
                    </NavLink>
                </li>
                <li className='app-nav-item'>
                    <NavLink
                        className={({ isActive }) => (isActive ? activeLink : normalLink)}
                        to="/users">
                        Users
                    </NavLink>
                </li>
                <li className='app-nav-item'>
                    <NavLink
                        className={({ isActive }) => (isActive ? activeLink : normalLink)}
                        to="/news">
                        News
                    </NavLink>
                </li>
                <li className='app-nav-item'>
                    <NavLink
                        className={({ isActive }) => (isActive ? activeLink : normalLink)}
                        to="/music">
                        Music
                    </NavLink>
                </li>
                <li className='app-nav-item'>
                    <NavLink
                        className={({ isActive }) => (isActive ? activeLink : normalLink)}
                        to="/settings">
                        Settings
                    </NavLink>
                </li>

                <li className='app-nav-item'>
                    <span>Friends</span>
                    <div className='app-nav-friends'>
                        {
                            friendsData.slice(0, 3)
                                .map((friend, i) => (<FriendsItem
                                    key={i}
                                    name={friend.name}
                                    id={friend.id}
                                    imgUrl={friend.imgUrl} />))
                        }
                    </div>
                </li>
            </ul>

        </nav>)
}

export default Navbar