import './MessageItem.css'

const MessageItem = ({ receive, message, imgUrl }) => {

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