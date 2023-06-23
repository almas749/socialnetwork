import ProfileStatus from './ProfileStatus/ProfileStatus';
import Preloader from '../../common/Preloader/Preloader';
import './ProfileInfo.css';
import userSample from './../../../assets/images/user.png';

const ProfileInfo = ({ profile, status, updateStatus }) => {
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
                <img src={profile.photos.large ? profile.photos.large : userSample}
                    alt='profile-img'
                    className='profile-image' />
                <div className='profile-data'>
                    <div className='profile-name'>
                        {profile.fullName}
                    </div>
                    <ProfileStatus
                        userId={profile.userId}
                        status={status}
                        updateStatus={updateStatus} />
                    <div className='profile-aboutme'>
                        <span className='profile-section-name'>About me:</span> {profile.aboutMe}
                    </div>
                    <div className='profile-job'>
                        {profile.lookingForAJob ? 'Looking for job' : 'Not looking for job'}
                        <div className='profile-job-status'>
                            <span className='profile-section-name'>
                                Job status:</span> {profile.lookingForAJobDescription}
                        </div>
                    </div>
                    <div className='profile-contacts'>
                        {Object.entries(profile.contacts).map(([key, value]) => {
                            return (
                                value ? <a className='profile-contacts-link'
                                    key={key}
                                    href={value.includes('https://') ?
                                        value : 'https://' + value}>{key}</a> : null
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;