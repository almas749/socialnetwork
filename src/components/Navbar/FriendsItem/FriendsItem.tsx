import { FC } from 'react'
import './FriendsItem.css'

type PropsType = {
    imgUrl: string
    name: string
    id: number
}

const FriendsItem: FC<PropsType> = ({ imgUrl, name, id }) => {
    return (
        <div className="app-nav-friends__item">
            <div className="app-nav-friends__item-img">
                <img src={imgUrl} alt="friendImage" />
            </div>
            <div>
                {name}
            </div>
        </div>
    )
}

export default FriendsItem