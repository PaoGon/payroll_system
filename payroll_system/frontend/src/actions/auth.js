import Cookies from 'js-cookie'
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL
}from './types'

export const checkAuthenticated = () => async dispatch => {

    try {
        const res = await fetch('/api/authenticated')
        const data = await res.json()

        if(data.error || data.isAuthenticated === 'error'){
            dispatch({
                type: AUTHENTICATED_FAIL,
                payload: false
            })
        }
        else if(data.isAuthenticated === 'success'){
            dispatch({
                type: AUTHENTICATED_SUCCESS,
                payload: true
            })

        }
        else{
            dispatch({
                tpye: AUTHENTICATED_FAIL,
                payload: false
            })
        }
        

    } catch(err){
        dispatch({
            tpye: AUTHENTICATED_FAIL,
            payload: false
        })

    }

} 


export const login = (contt) => async  dispatch =>{
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get('csrftoken')
        },
        body: JSON.stringify(contt),
        cache: "no-cache"
    };
    try {
        const res = await fetch("/api/login", requestOptions)
        const data = await res.json()
        
        if (data.success){
            dispatch({
                type: LOGIN_SUCCESS,
                payload: data.username
            })
        } else{
            dispatch({
                type: LOGIN_FAIL
            })
        }
    }catch(err) {
            dispatch({
                type: LOGIN_FAIL
            })
        };
}

export const logout = () => async dispatch =>{
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get('csrftoken')
        },
        body: JSON.stringify({'withcredentials': true}),
        cache: "no-cache"
    };
    try {
        const res = await fetch("/api/logout", requestOptions)
        console.log(res.ok)
        const data = await res.json()
        
        if (data.success){
            dispatch({
                type: LOGOUT_SUCCESS
            })
        } else{
            dispatch({
                type: LOGOUT_FAIL
            })
        }

    } catch(err){
        dispatch({
            type: LOGOUT_FAIL
        })
    };
}