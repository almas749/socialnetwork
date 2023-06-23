import './Post.css';

const Post = ({ message, likeCount }) => {
    return (
        <div className='posts-item'>
            <div className='post-avatar'>
                <img src="https://beebom.com/wp-content/uploads/2023/02/who-is-pain-in-naruto.jpg" alt="avatar" />
            </div>
            <div className='posts-message'>
                {message}
            </div>
            <div className='posts-likes'>
                <span>like: </span>
                {likeCount}
            </div>
        </div>
    );
}

export default Post;