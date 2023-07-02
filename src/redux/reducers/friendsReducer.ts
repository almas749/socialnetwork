const initialState = [
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
] as FriendType[]

type FriendType = {
    id: number
    name: string
    imgUrl: string
}

type InitialStateType = typeof initialState

const friendsReducer = (state = initialState): InitialStateType => {
    return [...state]
}

export default friendsReducer