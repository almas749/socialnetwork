import { ComponentType } from 'react';
import { connect } from 'react-redux';
import { compose } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../redux/reduxStore';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { actions } from '../../redux/reducers/dialogsReducer';
import { getDialogsPageState, getFriendsData } from '../../redux/selectors/dialogsSelectors';
import Dialogs from './Dialogs';

let mapStateToProps = (state: RootState) => {
    return {
        friendsData: getFriendsData(state),
        dialogsPage: getDialogsPageState(state)
    }
}

export default compose<ComponentType>(
    connect(mapStateToProps, {sendMessage: actions.sendMessage}),
    withAuthRedirect
)(Dialogs);