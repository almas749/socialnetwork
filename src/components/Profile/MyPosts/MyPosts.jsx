import Post from './Post/Post';
import './MyPosts.css';
import AddPostForm from './AddPostForm/AddPostForm';

const MyPosts = ({ addPost, postsData }) => {

    let postElements = [...postsData].reverse();
    return (
        <div>
            <h3>Posts</h3>
            <AddPostForm addPost={addPost} />
            <div className='posts'>
                {
                    postElements
                        .map((post, i) => <Post
                            key={i}
                            message={post.message}
                            likeCount={post.likeCount}
                            id={post.id} />)
                }
            </div>
        </div>
    );
}

export default MyPosts;