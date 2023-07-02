import { connect } from 'react-redux'
import { actions } from '../../../redux/reducers/profileReducer'
import { getPostsData } from '../../../redux/selectors/profileSelectors'
import { AppDispatch, RootState } from '../../../redux/reduxStore'
import MyPosts from './MyPosts'

let mapStateToProps = (state: RootState) => {
    return {
        postsData: getPostsData(state)
    }
}

let mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        addPost: (newPostText: string) => {
            dispatch(actions.addPostActionCreator(newPostText))
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer