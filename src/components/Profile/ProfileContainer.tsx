import { useEffect, useState, FC, ComponentType } from 'react'
import { connect } from 'react-redux'
import { compose } from '@reduxjs/toolkit'
import { withRouter } from '../../hoc/withRouter'
import Profile from './Profile'
import { getProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../redux/reducers/profileReducer'
import { getProfileState, getStatusState } from '../../redux/selectors/profileSelectors'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import Preloader from '../common/Preloader/Preloader'
import { ProfileType } from '../../types/Types'
import { RootState } from '../../redux/reduxStore'

type MapStatePropsType = {
    router: any
    id: number
    profile: ProfileType
    status: string
}

type MapDispatchPropsType = {
    getProfile: (id: number) => void
    getStatus: (id: number) => void
    savePhoto: (file: any) => void
    saveProfile: (profile: ProfileType) => Promise<number>
    updateStatus: (status: string) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

const ProfileContainer: FC<PropsType> = ({ getProfile,
    getStatus,
    savePhoto,
    saveProfile,
    router,
    id,
    profile,
    status,
    updateStatus,
    ...restProps }) => {

    const [loaded, setLoaded] = useState(false)

    const refreshProfile = () => {
        let profilePromise = getProfile(router.params.userId || id)
        let statusPromise = getStatus(router.params.userId || id)
        Promise.all([profilePromise, statusPromise])
            .then(() => {
                setLoaded(true)
            })
    }

    useEffect(() => {
        refreshProfile()
    }, [])

    useEffect(() => {
        setLoaded(false)
        refreshProfile()
    }, [router.navigate])

    if (!loaded) {
        return <Preloader />
    }
    return (
        <Profile {...restProps}
            isOwner={!router.params.userId}
            profile={profile}
            status={status}
            updateStatus={updateStatus}
            savePhoto={savePhoto}
            saveProfile={saveProfile}
        />
    )

}

let mapStateToProps = (state: RootState) => {
    return {
        profile: getProfileState(state),
        status: getStatusState(state),
    }
}

export default compose<ComponentType>(
    connect(mapStateToProps, { getProfile, getStatus, updateStatus, savePhoto, saveProfile }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)

