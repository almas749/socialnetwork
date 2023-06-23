import { connect } from 'react-redux';
import { addPostActionCreator } from '../../../redux/reducers/profileReducer';
import MyPosts from './MyPosts';
import { getPostsData } from '../../../redux/selectors/profileSelectors';

let mapStateToProps = (state) => {
    return {
        postsData: getPostsData(state)
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {
            dispatch(addPostActionCreator(newPostText));
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;