import { useState, FC, ChangeEvent } from 'react'
import { UseFormSetError } from 'react-hook-form/dist/types'
import { ProfileType } from '../../../types/Types'
import ProfileStatus from './ProfileStatus/ProfileStatus'
import ProfileData from './ProfileData'
import ProfileDataForm from './ProfileDataForm'
import Preloader from '../../common/Preloader/Preloader'
import userSample from './../../../assets/images/user.png'
import './ProfileInfo.css'

type PropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: any) => void
    saveProfile: (profile: ProfileType) => Promise<number>
}

const ProfileInfo: FC<PropsType> = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {

    const [editMode, setEditMode] = useState(false)

    const toEditMode = () => {
        setEditMode(true)
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (data: ProfileType, setError: UseFormSetError<ProfileType>) => {
        saveProfile(data)
            .then(
                () => {
                    setEditMode(false)
                }
            )
            .catch(
                (errorMessage) => {
                    setError('root.serverError', {
                        type: "server",
                        message: errorMessage,
                    });
                }
            )
    }

    if (profile == null) {
        return <Preloader />
    }

    return (
        <div>
            <div>
                <img src='https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/advice/maps-satellite-images/satellite-image-of-globe.jpg'
                    alt='profile-bg'
                    className='profile-bg' />
            </div>
            <div className='profile-info'>
                <div className='profile-image-wrapper'>
                    <img src={profile.photos.large || userSample}
                        alt='profile-img'
                        className='profile-image' />
                    {isOwner ? <input type='file' onChange={onMainPhotoSelected} /> : null}
                </div>
                <div className='profile-data'>
                    {editMode ?
                        <ProfileDataForm
                            initialValues={profile}
                            onSubmit={onSubmit} /> :
                        <ProfileData
                            profile={profile}
                            isOwner={isOwner}
                            toEditMode={toEditMode} />
                    }
                    <ProfileStatus
                        isOwner={isOwner}
                        status={status}
                        updateStatus={updateStatus} />
                </div>
            </div>
        </div>
    )
}


export default ProfileInfo