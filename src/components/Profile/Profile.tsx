import { ProfileType } from '../../types/Types'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import { FC } from 'react'

type PropsType = {
    isOwner: boolean
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    savePhoto: (file: any) => void
    saveProfile: (profile: ProfileType) => Promise<number>
}

const Profile: FC<PropsType> = ({ isOwner, profile, status, updateStatus, savePhoto, saveProfile, ...restProps }) => {

    return (
        <div>
            <ProfileInfo
                {...restProps}
                isOwner={isOwner}
                profile={profile}
                status={status}
                updateStatus={updateStatus}
                saveProfile={saveProfile}
                savePhoto={savePhoto} />
            <MyPostsContainer />
        </div>
    )
}

export default Profile