import { useEffect, useState, FC, ChangeEvent } from 'react'
import './ProfileStatus.css'

type PropsType = {
    isOwner: boolean
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatus: FC<PropsType>= ({ isOwner, status, updateStatus }) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [stateStatus, setStateStatus] = useState<string>(status)

    useEffect(() => {
        setStateStatus(status)
    }, [status])

    const toggleEditMode = () => {
        setEditMode(!editMode)
        updateStatus(stateStatus)
    }

    const nothing = () => {
        return null
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStateStatus(e.currentTarget.value)
    }

    return (
        <div>
            <span>Status:</span>
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
                            className="profile-status"
                            onDoubleClick={isOwner ? toggleEditMode : nothing}>
                            {status ? status : 'no status'}
                        </span>
                    </div>
            }
        </div>
    )

}

export default ProfileStatus