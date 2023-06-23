import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from '@reduxjs/toolkit';
import { withRouter } from '../../hoc/withRouter';
import Profile from './Profile';
import { getProfile, getStatus, updateStatus } from '../../redux/reducers/profileReducer';
import { getProfileState, getStatusState } from '../../redux/selectors/profileSelectors';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import Preloader from '../common/Preloader/Preloader';


const ProfileContainer = ({ getProfile, getStatus, router, id, profile, status, updateStatus, ...restProps }) => {

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        let profilePromise = getProfile(router.params.userId || id);
        let statusPromise = getStatus(router.params.userId || id);
        Promise.all([profilePromise, statusPromise])
            .then(() => {
                setLoaded(true);
            });
    }, []);

    useEffect(() => {
        setLoaded(false);
        let profilePromise = getProfile(router.params.userId || id);
        let statusPromise = getStatus(router.params.userId || id);
        Promise.all([profilePromise, statusPromise])
            .then(() => {
                setLoaded(true);
            });
    }, [router.navigate]);

    if (!loaded) {
        return <Preloader />;
    }
    return (
        <Profile {...restProps}
            profile={profile}
            status={status}
            updateStatus={updateStatus}
        />
    );

}

let mapStateToProps = (state) => {
    return {
        profile: getProfileState(state),
        status: getStatusState(state)
    }
};

export default compose(
    connect(mapStateToProps, { getProfile, getStatus, updateStatus }),
    withRouter,
    withAuthRedirect
)(ProfileContainer);

