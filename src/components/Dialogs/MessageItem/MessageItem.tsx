import { FC } from 'react'
import './MessageItem.css'

type PropsType = {
    receive: boolean
    message: string
    imgUrl: string
    id: number
}

const MessageItem: FC<PropsType> = ({ receive, message, imgUrl, id }) => {

    const sendClass = "dialog-message";
    const receiveClass = "dialog-message dialog-message-receive";

    const isReceiveMessage = receive;

    return (
        <li className={isReceiveMessage ? receiveClass : sendClass}>
            <div className="dialog-message-item_img">
                <img src={imgUrl} alt="dialogImage" />
            </div>
            <div className="dialog-message-text">
                {message}
            </div>
        </li>
    );
}

export default MessageItem;