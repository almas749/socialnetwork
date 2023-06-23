import { connect } from 'react-redux';
import { compose } from '@reduxjs/toolkit';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { sendMessageActionCreator } from '../../redux/reducers/dialogsReducer';
import { getDialogsPageState, getFriendsData } from '../../redux/selectors/dialogsSelectors';
import Dialogs from './Dialogs';

let mapStateToProps = (state) => {
    return {
        friendsData: getFriendsData(state),
        dialogsPage: getDialogsPageState(state)
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessageText) => {
            dispatch(sendMessageActionCreator(newMessageText));
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);