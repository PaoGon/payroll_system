import React, { useState } from 'react'
import {Button} from './Button'
import {RiAddCircleFill} from 'react-icons/ri'
import Notification from './Notification'
import EmployeeContent from './EmployeeContent'
import Register from './Register'

export default function Employee(props) {
    const [click, setClick] = useState(false);
    const [trigger, setTrigger] = useState(true);

    //decides who will be render in the data class of employee 
    const [action, setAction] = useState(true)


    function buttonPressed(){
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            cache: "no-cache"
        };
        fetch("/api/create-employee", requestOptions)
            .then((response) =>response.json())
            .then(() => setClick(false))
            .then(()=> setTrigger(true))
            .catch(err => console.log(err));
    }

    return (
        <div className='employee'>
            <div className="head">
                <h1>Employee</h1>
                <div className="wrap">
                    <Button buttonColor='blue' onClick= {() => setClick(true)}>
                        <RiAddCircleFill/>
                        Add
                    </Button>
                </div>  
                <Register trigger={click} setTrigger={setClick} content={setTrigger} click={buttonPressed}/>
            </div>
            <div className="data">

                {/* this will be triger to render the search */}
                <div className="contSearh">
                    <EmployeeContent trigger={trigger} setTrigger={setTrigger}/>
                </div>
            </div>
        </div>     
    )
}

