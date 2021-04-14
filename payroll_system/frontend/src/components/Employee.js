import React, { useState } from 'react'
import {Button} from './Button'
import {RiAddCircleFill} from 'react-icons/ri'
import Popup from './Popup'
import {PopupData} from './PopupData'
import EmployeeContent from './EmployeeContent'

export default function Employee() {
    const [click, setClick] = useState(false);
    const [trigger, setTrigger] = useState(false);
    const [data, setData] = useState({
        name: "",
        surname: "",
        middlename: "",
        status: "",
        position: "",
        employement_type: "",
        fixed_rate: "",
        sss_id: "",
        tin_num: "",
        phil_id: "",
        pagibig_id: ""
    });

    function getData(val){
        setData({
            ...data,
            [val.target.name]: val.target.value
        });
        
    }

    function buttonPressed(){
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
            cache: "no-cache"
        };
        fetch("/create-employee", requestOptions)
            .then((response) =>response.json())
            // .then((data) => console.log(data))
            .then(() => setClick(false))
            .then(()=> setTrigger(true))
            .catch(err => console.log(err));
    }

    return (
        <>
            <div className='employee'>
                <div className="head">
                    <h1>Employee</h1>
                    <div className="wrap">
                        <Button buttonColor='blue' onClick= {() => setClick(true)}>
                            <RiAddCircleFill/>
                            Add
                        </Button>
                    </div>  
                    <Popup trigger={click} setTrigger={setClick} click={buttonPressed}>
                        <div className="inputt">
                           {PopupData.map((val, key) =>{
                               return(
                                    <div className='contt'>
                                        <label key={key}>
                                            <p>{val.label}</p> 
                                            <input type={val.type} name={val.name} placeholder={val.place_holder} onChange={getData}></input>
                                        </label>
                                    </div>         
                               );
                           })}
                        </div>
                    </Popup>
                </div>
                <div className="data">
                    <EmployeeContent trigger={trigger} setTrigger={setTrigger}/>
                </div>
            </div>
        </>     
    )
}

