import usersReducer, { InitialStateType, actions } from "./usersReducer"

let state: InitialStateType;

beforeEach (() => {
    state = {
        usersData: [
            {
                id: 0, 
                name: 'almas1', 
                followed: false, 
                photos:{
                    large: null, 
                    small: null
                }, 
                status: 'status1'
            },
            {
                id: 1, 
                name: 'almas2', 
                followed: true, 
                photos:{
                    large: null, 
                    small: null
                }, 
                status: 'status2'
            },
            {
                id: 2, 
                name: 'almas3', 
                followed: false, 
                photos:{
                    large: null, 
                    small: null
                }, 
                status: 'status3'
            },
            {
                id: 3, 
                name: 'almas4', 
                followed: true, 
                photos:{
                    large: null, 
                    small: null
                }, 
                status: 'status4'
            }
        ],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isLoading: false,
        followingInProgress: null as number | null,
        filter: {term: '', friend: null as null | boolean}
    }
})
    

test("follow success test", () => {
    const newState = usersReducer(state, actions.switchFollow(2))

    expect(newState.usersData[0].followed).toBeFalsy();
    expect(newState.usersData[2].followed).toBeTruthy();
})
test("unfollow success test", () => {
    const newState = usersReducer(state, actions.switchFollow(3))

    expect(newState.usersData[1].followed).toBeTruthy();
    expect(newState.usersData[3].followed).toBeFalsy();
})