// Interfaces
import { User, UserCredentials } from "../../interfaces/user.interface"
// Services
import { userService } from "../../services/user.service"
import { toast } from 'react-toastify'


const notifyFail = () => toast.warning('Oops something went wrong!')

export function loadUsers() {
    return async (dispatch: any) => {
        try {
            const users = await userService.getUsers()
            dispatch({ type: 'SET_USERS', payload: users })
        } catch (err) {
            notifyFail()
        }
    }
}

export function loadLoggedinUser() {
    return async (dispatch: any) => {
        try {
            const loggedinUser = userService.getLoggedinUser()
            dispatch({ type: 'SET_LOGGEDIN_USER', payload: loggedinUser })
        } catch (err) {
            notifyFail()
        }
    }
}

export function signup(credentials: UserCredentials) {
    return async (dispatch: any) => {
        try {
            const user = await userService.signup(credentials)
            dispatch({ type: 'ADD_USER', payload: user })
            userService.setLoggedinUser(user)
            dispatch({ type: 'SET_LOGGEDIN_USER', payload: user })
            return user
        } catch (err) {
            notifyFail()
            throw err
        }
    }
}

export function login(credentials: UserCredentials) {
    return async (dispatch: any) => {
        try {
            const user = await userService.login(credentials)
            userService.setLoggedinUser(user)
            dispatch({ type: 'SET_LOGGEDIN_USER', payload: user })
        } catch (err) {
            notifyFail()
            throw err
        }
    }
}

export function logout() {
    return (dispatch: any) => {
        try {
            userService.logout()
            dispatch({ type: 'REMOVE_LOGGEDIN_USER' })

        } catch (err) {
            notifyFail()
        }
    }
}

export function setLoggedinUser(user: User) {
    return (dispatch: any) => {
        try {
            userService.setLoggedinUser(user)
            dispatch({ type: 'SET_LOGGEDIN_USER', payload: user })
        } catch (err) {
            notifyFail()
        }
    }
}

export function updateUser(user: User) {
    return async (dispatch: any) => {
        try {
            dispatch({ type: 'UPDATE_USER', payload: user })
            await userService.update(user)
        } catch (err) {
            notifyFail()
        }
    }

}