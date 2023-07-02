import { FC } from "react"
import { ProfileType } from "../../../types/Types"
import './ProfileInfo.css'

type PropsType = {
    profile: ProfileType
    isOwner: boolean
    toEditMode: () => void
}

const ProfileData: FC<PropsType> = ({ profile, isOwner, toEditMode }) => {
    return (
        <>
            <div className='profile-name'>
                {profile.fullName}
            </div>
            {isOwner ? <button onClick={toEditMode}>Edit</button> : null}
            <div className='profile-aboutme'>
                <span className='profile-section-name'>About me:</span> {profile.aboutMe}
            </div>
            <div className='profile-job'>
                Looking for a job:
                {profile.lookingForAJob ? ' yes' : ' no'}
                {
                    profile.lookingForAJob ?
                        <div className='profile-job-description'>
                            <span className='profile-section-name'>
                                Professional skills:</span> {profile.lookingForAJobDescription}
                        </div> : null
                }
            </div>
            <div className='profile-contacts'>
                {Object.entries(profile.contacts).map(([key, value]) => {
                    return (
                        value ? <a className='profile-contacts-link'
                            key={key}
                            href={value.includes('https://') ?
                                value : 'https://' + value}>{key}</a> : null
                    )
                })}
            </div>

        </>
    )
}

export default ProfileData