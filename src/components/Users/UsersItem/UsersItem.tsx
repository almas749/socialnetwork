import { NavLink } from 'react-router-dom'
import './UsersItem.css'
import { FC } from 'react'
import userSample from './../../../assets/images/user.png'

type PropsType = {
    id: number
    photo: string | null
    followingInProgress: number | null
    followed: boolean
    name: string
    status: string
    onSwitchFollow: (id: number, followed: boolean) => void
}

const UsersItem: FC<PropsType> = ({id, photo, followingInProgress, followed, name, status, onSwitchFollow}) => {
    return (
        <li className='user-item'>
            <div className='user-item-left'>
                <NavLink to={'/profile/' + id}>
                    <img src={photo ? photo : userSample}
                        alt="userImage"
                        className='user-item-img' />
                </NavLink>
                <button disabled={followingInProgress === id}
                    onClick={() => onSwitchFollow(id, followed)}>
                    {followed ? 'Unfollow' : 'Follow'}
                </button>
            </div>
            <div className='user-item-right'>
                <div className='user-item-info'>
                    <span>{name}</span>
                    <span className='user-item-info__status'>{status}</span>
                </div>
                <div className='user-item-location'>
                    <span>city</span>
                    <span>country</span>
                </div>
            </div>
        </li>
    )
}

export default UsersItem