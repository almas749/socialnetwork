import dialogsReducer from "./dialogs-reducer";
import friendsReducer from "./friends-reducer";
import profileReducer from "./profile-reducer";

let store = {
    _state: {
        profilePage: {
            postsData: [
                {
                    id: 1,
                    message: 'Sup',
                    likeCount: 10
                },
                {
                    id: 2,
                    message: 'How u doin',
                    likeCount: 13
                },
                {
                    id: 3,
                    message: 'My name is alesha',
                    likeCount: 2
                }
            ],
            newPostText: ''
        },
        dialogsPage: {
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
            ],
            newMessageText: ''
        },
        friendsData: [
            {
                id: 1,
                name: 'Alesha',
                imgUrl: 'https://qph.cf2.quoracdn.net/main-qimg-b49869393201bfecdb67f1dc030ede55-lq'
            },
            {
                id: 2,
                name: 'Maksat',
                imgUrl: 'https://staticg.sportskeeda.com/editor/2022/07/b56be-16578002779209.png'
            },
            {
                id: 3,
                name: 'Kuanysh',
                imgUrl: 'https://practicaltyping.com/wp-content/uploads/2019/07/tsunade.jpg'
            },
            {
                id: 4,
                name: 'Arman',
                imgUrl: 'https://i.pinimg.com/474x/73/d9/c1/73d9c110a9f2bdfe5b38ca3bb9139431.jpg'
            },
            {
                id: 5,
                name: 'Valery',
                imgUrl: 'https://img.quizur.com/f/img624e56a08ee5a9.85158775.jpg?lastEdited=1649301161'
            }
        ]
    },
    _callSubcriber() { },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubcriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.friendsData = friendsReducer(this._state.friendsData, action);
        this._callSubcriber();
    }
};

export default store;