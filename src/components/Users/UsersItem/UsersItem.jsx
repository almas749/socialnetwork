import { NavLink } from 'react-router-dom';
import userSample from './../../../assets/images/user.png';
import './UsersItem.css';

const UsersItem = (props) => {
    return (
        <li className='user-item'>
            <div className='user-item-left'>
                <NavLink to={'/profile/' + props.id}>
                    <img src={props.photo ? props.photo : userSample}
                        alt="userImage"
                        className='user-item-img' />
                </NavLink>
                <button disabled={props.followingInProgress === props.id}
                    onClick={() => props.onSwitchFollow(props.id, props.followed)}>
                    {props.followed ? 'Unfollow' : 'Follow'}
                </button>
            </div>
            <div className='user-item-right'>
                <div className='user-item-info'>
                    <span>{props.name}</span>
                    <span className='user-item-info__status'>{props.status}</span>
                </div>
                <div className='user-item-location'>
                    <span>city</span>
                    <span>country</span>
                </div>
            </div>
        </li>
    );
}

export default UsersItem;