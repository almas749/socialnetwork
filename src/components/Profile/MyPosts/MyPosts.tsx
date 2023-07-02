import { FC } from 'react'
import Post from './Post/Post'
import { PostType } from '../../../types/Types'
import AddPostForm from './AddPostForm/AddPostForm'
import './MyPosts.css'

type PropsType = {
    addPost: (newPostText: string) => void
    postsData: PostType[]
}

const MyPosts: FC<PropsType> = ({ addPost, postsData }) => {

    let postElements = [...postsData].reverse()
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
    )
}

export default MyPosts