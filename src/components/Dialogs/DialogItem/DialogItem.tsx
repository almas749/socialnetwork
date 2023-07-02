import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import './DialogItem.css'

type PropsType = {
    id: number
    imgUrl: string
    name: string
}

const DialogItem: FC<PropsType> = ({ id, imgUrl, name }) => {

    const activeLink = "dialog-item-link dialog-item-link--active";
    const normalLink = "dialog-item-link";

    return (
        <li className='dialog-item'>
            <NavLink to={`/dialogs/${id}`}
                className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                <div className="dialog-item-img">
                    <img src={imgUrl} alt="dialogImage" />
                </div>
                <div>
                    {name}
                </div>
            </NavLink>
        </li>
    );
}

export default DialogItem;