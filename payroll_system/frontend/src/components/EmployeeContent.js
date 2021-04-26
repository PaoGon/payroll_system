import React, { useState } from 'react'
import {FaRegUserCircle} from 'react-icons/fa'
import {AiFillDelete} from 'react-icons/ai'
import {AiFillEdit} from 'react-icons/ai'
import {Button} from './Button'
import {PopupData} from './PopupData'

import Popup from './Popup'

export default function EmployeeContent(props) {

    // stores get data form the API
    const[state, setState] = useState();
    // trigger for render
    const[render, setRender] = useState(false);

    // triggers edit action
    const[edit, setEdit] = useState(false);

    // stores the ID of the selected employee
    const[id, setId] = useState();

    // stores the data of the edit
    const [data, setData] = useState({});


    // gets the data of the edit fields
    function getData(val){
        setData({
            ...data,
            [val.target.name]: val.target.value
        });
        
    }


    // sends get reqeust to the API
    function getReq(){
        fetch("/api/employee-list")
        .then((response)=>response.json())
        .then((data) => setState(data))
        .then(()=> setRender(true))
        .then(() => props.setTrigger(false))
        .catch(err => console.log(err));
    }

    // hundles delete
    function deleteEmp(id){
        const requestOptions = {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            cache: "no-cache"
        };
        fetch(`/delete-employee?id=${id}`, requestOptions)
        .then(() => getReq())
        .catch(err => console.log(err));  
    }

    function updateEmp(){
        const requestOptions = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
            cache: "no-cache"
        };
        fetch(`/update-employee?id=${id}`, requestOptions)
        .then(() => getReq())
        .then(() => setEdit(false))
        .then(() => setData({}))
        .catch(err => console.log(err));  

    }

    window.onload = () => getReq();
    

    return(
        <div className="con">
            {props.trigger ? getReq() : ''}

            <div class="div-table">
                <div class="div-table-row">
                    <div className="div-table-col lab"></div>
                    <div class="div-table-col lab">Employee Name</div>
                    <div  class="div-table-col lab">Designation</div>
                    <div  class="div-table-col lab">Status</div>
                    <div className="div-table-col lab">Employement Type</div>
                    <div className="div-table-col lab">Employee ID</div>
                    <div className="div-table-col lab">SSS</div>
                    <div className="div-table-col lab">TIN</div>
                    <div className="div-table-col lab">pagIBIG</div>
                    <div className="div-table-col lab">PHILHEALTH</div>
                    <div className="div-table-col lab"></div>
                    
                </div>
                {render ? state.map((val, key) => {
                    return(
                        <div class="div-table-row info" key = {key}>
                            <div className="div-table-col icon"><FaRegUserCircle/></div>
                            <div className="div-table-col">
                                <div className="name">
                                    {val.surname} {val.name } {val.middlename} 
                                </div>
                            </div>
                            <div className="div-table-col" >{val.position}</div>
                            <div className="div-table-col">{val.status}</div>
                            <div className="div-table-col">{val.employement_type}</div>
                            <div className="div-table-col">{val.employee_id}</div>
                            <div className="div-table-col">{val.sss_id}</div>
                            <div className="div-table-col">{val.tin_num}</div>
                            <div className="div-table-col">{val.pagibig_id}</div>
                            <div className="div-table-col">{val.phil_id}</div>
                            <div className="div-table-col ed">
                                <Button buttonColor='green' onClick={() => {
                                    setEdit(true)
                                    setId(val.id)
                                }}>
                                    <AiFillEdit/>
                                    Edit
                                </Button>
                                <Button buttonColor='red' onClick={() => deleteEmp(val.id)}>
                                    <AiFillDelete/>
                                    Delete
                                </Button>
                                
                            </div>
                        </div>
                    )
                }): ''}
            </div>

            <Popup trigger={edit} setTrigger={setEdit} click={updateEmp}>
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
    )
}
