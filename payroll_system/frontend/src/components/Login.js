import React, { useState } from 'react'
import { Button } from './Button'
import { LoginData } from './LoginData'

import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../actions/auth'
import CSRFToken from './CSRFToken'

function Login({login, isAuthenticated}) {
    const [data, setData] = useState({
        
        username: "",
        password: "",
        
    });


    function getData(val){
        setData({
            ...data,
            [val.target.name]: val.target.value
        });
        
    }

    const onSubmit = e =>{
        e.preventDefault();
        console.log(data)

        login(data)
    };

    if (isAuthenticated){
        return <Redirect to="/dashboard" />
    }

    

    return (
        <>
            <form className='login' onSubmit={e => onSubmit(e)}>
                <CSRFToken/>
                <div className="log-cont">
                    <h1 className='title'>Payroll System</h1>
                
                    <div className="log-inputs">
                        {LoginData.map((val, key) => {    
                            return(
                                <div className="log-fields" key={key}>
                                    
                                    <input type={val.type} name={val.name} placeholder={val.place_holder} size={val.size} onChange={getData} required/>
                                    
                                </div>
                            );
                        })}
                    </div>
                    
                    <div className="log-btn">
                        <Button buttonColor='blue' buttonSize='btn-mobile' type='submit'>
                            Login
                        </Button>
                    </div>
                    
                </div>
            </form>



        </>
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login})(Login)
