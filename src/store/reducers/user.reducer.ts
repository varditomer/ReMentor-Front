// Interfaces
import { User } from "../../interfaces/user.interface"


export interface USER_STATE {
    users: User[],
    loggedinUser: User | null
}

const USER_STATE: USER_STATE = {
    users: [],
    loggedinUser: null
}

type Action = {
    type: string,
    payload: any
}

export function userReducer(state = USER_STATE, action: Action) {
    switch (action.type) {
        case 'SET_USERS':
            return {
                ...state,
                users: action.payload
            }
        case 'ADD_USER':
            return {
                ...state,
                users: [action.payload, ...state.users]
            }
        case 'REMOVE_USER':
            return {
                ...state,
                users: state.users.filter((user: User) => user._id !== action.payload)
            }
        case 'UPDATE_USER':
            return {
                ...state,
                users: state.users.map((user: User) => (user._id === action.payload._id) ? action.payload : user)
            }
        case 'SET_LOGGEDIN_USER':
            return {
                ...state,
                loggedinUser: action.payload
            }
        case 'REMOVE_LOGGEDIN_USER':
            return {
                ...state,
                loggedinUser: null
            }
        default:
            return state
    }

}