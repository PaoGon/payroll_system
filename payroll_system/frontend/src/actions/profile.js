import Cookies from 'js-cookie'

import {
    LOAD_USER_PROFILE_SUCCESS,
    LOAD_USER_PROFILE_FAIL
}from './types'

export const load_user = () => async dispatch => {
    
    try{

        const res = await fetch("/api/user")
        const data = await res.json()
        
        
        if(data.error){
           dispatch({
               type: LOAD_USER_PROFILE_FAIL
           }) 
        } else{
            dispatch({
                type: LOAD_USER_PROFILE_SUCCESS,
                payload: data
            })
        }
        


    }catch(err){
       dispatch({
           type: LOAD_USER_PROFILE_FAIL
       }) 
    }

}