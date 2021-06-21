import React, {useState} from 'react'
import {FaTimes} from 'react-icons/fa'
import {Button} from './Button'
import { RegisterData } from './RegisterData'
import Cookies from 'js-cookie'
function Register(props) {
    const [data, setData] = useState({
        
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        
    });


    function getData(val){
        setData({
            ...data,
            [val.target.name]: val.target.value
        });
        
    }

    const onSubmit = e =>{
        e.preventDefault();
    };

    function register_emp(){
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get('csrftoken')
            },
            body: JSON.stringify(data),
            cache: "no-cache"
        };
        fetch("/api/register-user", requestOptions)
            .then((response) =>response.json())
            .then(() => props.setTrigger(false))
            .then(() => props.content(true))
            .catch(err => console.log(err));
    }


    return (props.trigger) ? (
        <div className="popup">
            <form className="register" onSubmit={e => onSubmit(e)}>
                <div className="ss">
                    <h1>Register Employee</h1>
                    <div className="exit" onClick={() => props.setTrigger(false)}>
                        <FaTimes/>
                    </div>
                    
                </div>
                <div className="reg-inputs">
                    {RegisterData.map((val, key) => {
                        return(
                            <div className='log-fields' key={key}>

                                <input type={val.type} name={val.name} placeholder={val.place_holder} size={val.size} minLength={val.min} onChange={getData} required/>

                            </div>
                        )
                    })}

                </div>
                <div className="reg-btn">
                    <Button buttonColor='blue' buttonSize='btn-mobile' onClick={() => register_emp()}>
                        Submit
                    </Button>
                </div>

            </form>
        </div>
    ) : '';
}

export default Register
