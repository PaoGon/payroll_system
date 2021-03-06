import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL
} from '../actions/types'

const initialState = {
    isAuthenticated: null,
    status: ''
}


export default function(state = initialState, action){
    const {type, payload} = action

    switch(type){
        case AUTHENTICATED_SUCCESS:
        case AUTHENTICATED_FAIL:
            return{
                ...state,
                isAuthenticated: payload
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                status: payload
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                status: ''
            }
        case LOGIN_FAIL:
        case LOGOUT_FAIL:
            return state

        default:
            return state

    }
}