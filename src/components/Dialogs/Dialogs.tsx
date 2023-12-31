import { FriendType } from '../../types/Types'
import DialogItem from './DialogItem/DialogItem'
import MessageItem from './MessageItem/MessageItem'
import AddMessageForm from './AddMessageForm/AddMessageForm'
import './Dialogs.css'
import { RootState } from '../../redux/reduxStore'
import { FC } from 'react'

type PropsType = {
    friendsData: FriendType[]
    dialogsPage: RootState["dialogsPage"]
    sendMessage: (newMessageText: string) => void
}

const Dialogs: FC<PropsType> = ({ friendsData, dialogsPage, sendMessage }) => {
    const {messagesData} = dialogsPage
    return (
        <div className='dialogs'>
            <ul className='dialogs-items'>
                {
                    friendsData
                        .map((dialog, i) => <DialogItem
                            key={i}
                            name={dialog.name}
                            id={dialog.id}
                            imgUrl={dialog.imgUrl} />)
                }
            </ul>
            <ul className='dialogs-messages'>
                {
                    messagesData
                        .map((message, i) => <MessageItem
                            key={i}
                            message={message.message}
                            id={message.id}
                            imgUrl={message.imgUrl}
                            receive={message.receive} />)
                }
                <AddMessageForm
                    sendMessage={sendMessage} />
            </ul>
        </div>
    )
}

export default Dialogs