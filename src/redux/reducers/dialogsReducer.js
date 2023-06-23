const SEND_MESSAGE = 'SEND-MESSAGE';

const initialState = {
    messagesData: [
        {
            id: 1,
            message: 'Salam',
            imgUrl: 'https://beebom.com/wp-content/uploads/2023/02/who-is-pain-in-naruto.jpg',
            receive: false
        },
        {
            id: 2,
            message: 'Nasvai bar ma? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, ipsa, velit ipsam quo possimus vitae molestiae dicta illum facere minima consequuntur unde error atque maxime quod corporis, nemo ea magni.',
            imgUrl: 'https://beebom.com/wp-content/uploads/2023/02/who-is-pain-in-naruto.jpg',
            receive: false
        },
        {
            id: 3,
            message: 'Where are you from? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea adipisci ad tempore quis itaque ab magnam. Pariatur esse, facilis itaque eaque nulla inventore, perferendis dolor, mollitia cum quia doloremque quae.',
            imgUrl: 'https://staticg.sportskeeda.com/editor/2022/07/b56be-16578002779209.png',
            receive: true
        }
    ]
}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SEND_MESSAGE: {
            return {
                ...state,
                messagesData: [...state.messagesData, {
                    id: state.messagesData[state.messagesData.length - 1].id + 1,
                    message: action.newMessageText,
                    imgUrl: 'https://beebom.com/wp-content/uploads/2023/02/who-is-pain-in-naruto.jpg',
                    receive: false
                }]
            };
        }
        default:
            return state;
    }
}


export const sendMessageActionCreator = (newMessageText) => ({
    type: SEND_MESSAGE,
    newMessageText
});

export default dialogsReducer;