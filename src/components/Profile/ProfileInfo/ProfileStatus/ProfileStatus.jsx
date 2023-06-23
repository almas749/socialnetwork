import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './ProfileStatus.css';

const ProfileStatus = ({ userId, status, updateStatus }) => {

    const authId = useSelector((state) => state.auth.id);
    const [editMode, setEditMode] = useState(false);
    const [stateStatus, setStateStatus] = useState(status);

    useEffect(() => {
        setStateStatus(status);
    }, [status]);

    const toggleEditMode = () => {
        setEditMode(!editMode);
        updateStatus(stateStatus);
    }

    const onStatusChange = (e) => {
        setStateStatus(e.currentTarget.value);
    }

    return (
        <div className="profile-status">
            {
                editMode ?
                    <div>
                        <input
                            name='status'
                            autoFocus={true}
                            onBlur={toggleEditMode}
                            value={stateStatus}
                            onChange={onStatusChange} />
                    </div> :
                    <div>
                        <span
                            onDoubleClick={(userId === authId) ? toggleEditMode : null}>
                            {status ? status : 'no status'}
                        </span>
                    </div>
            }
        </div>
    );

}

export default ProfileStatus;