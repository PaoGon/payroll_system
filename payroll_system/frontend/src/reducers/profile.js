import{
    LOAD_USER_PROFILE_SUCCESS,
    LOAD_USER_PROFILE_FAIL
}from '../actions/types'

const initialState={
    id: '',
    username: '',
    payroll: '',
    status: '',
    fixed_rate: '',

}

export default function(state = initialState, action) {
    const {type, payload} = action

    switch(type){
        case LOAD_USER_PROFILE_SUCCESS:
            return {
                ...state,
                id: payload.profile.id,
                username: payload.username,
                status: payload.status,
                fixed_rate: payload.profile.fixed_rate,
                payroll: payload.profile.payroll,

            }
        case LOAD_USER_PROFILE_FAIL:
            return{
                ...initialState,
                id: '',
                username: '',
                status: '',
                payroll: '',
                fixed_rate: ''
            }
        default:
            return state
    }
}