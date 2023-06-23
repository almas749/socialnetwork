import './FriendsItem.css';


const FriendsItem = ({ imgUrl, name }) => {
    return (
        <div className="app-nav-friends__item">
            <div className="app-nav-friends__item-img">
                <img src={imgUrl} alt="friendImage" />
            </div>
            <div>
                {name}
            </div>
        </div>
    );
}

export default FriendsItem;