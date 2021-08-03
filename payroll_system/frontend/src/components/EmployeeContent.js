import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { FaRegUserCircle } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'
import { AiFillEdit } from 'react-icons/ai'
import { Button } from './Button'
import { PopupData } from './PopupData'
import { StatusData } from './StatusData'
import { TypeData } from './TypeData'
import { PositionRate } from './PositionRate'
import { Statutory } from './Statutory'
import Notification from './Notification'

import Popup from './Popup'

export default function EmployeeContent(props) {

    // *stores get data form the API
    const [state, setState] = useState();
    // !trigger for render
    const [render, setRender] = useState(false);

    // !triggers edit action
    const [edit, setEdit] = useState(false);

    const[notify, setNotify] = useState({isOpen:false, message:'', type:''})

    // *stores the ID of the selected employee
    const [id, setId] = useState();

    // *stores the data of the edit
    const [data, setData] = useState({});



    const onDelete = id =>{
        if(window.confirm('Are You sure to delete this record ?')){
            deleteEmp(id);
            setNotify({
                isOpen:true,
                message:'Deleted Succesfully',
                type: 'error'
            })
        }
    }

    function status_data(cont,key){
        return (cont['status'] = key)
    }

    function type_data(cont,key){
        return (cont['employement_type'] = key)
    }

    function tryData(test,res){
        status_data(test,res)
        console.log(data)
    }


    function sampleData(test,res){
        type_data(test,res)
        console.log(data)
    }

    // ?gets the data of the edit fields
    function getData(val) {
        setData({
            ...data,
            [val.target.name]: val.target.value
        });

    }


    // ?sends get reqeust to the API
    const getReq = async () => {
        const res = await fetch("/api/employee-list")
        const data = await res.json()

        try {
            setState(data)
            setRender(true)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getReq()
        props.setTrigger(false)
    }, [props.trigger])

    // ?hundles delete
    function deleteEmp(id) {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get('csrftoken')
            },
            cache: "no-cache"
        };
        fetch(`/api/delete-employee?id=${id}`, requestOptions)
            .then(() => getReq())
            .catch(err => console.log(err));
    }

    // ?hundles delete
    function updateEmp() {
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get('csrftoken')
            },
            body: JSON.stringify(data),
            cache: "no-cache"
        };
        fetch(`/api/update-employee?id=${id}`, requestOptions)
            .then(() => getReq())
            .then(() => setEdit(false))
            .then(() => setData({}))
            setNotify({
                isOpen:true,
                message:'Submitted Succesfully',
                type: 'success'
            })
            .catch(err => console.log(err));

    }



    return (
        <div className="con">

            {/* ?activates the GET method */}
            {/* {props.trigger ? getReq() : ''}
            {console.log(data)} */}

            <div class="div-table">
                <div class="div-table-row">
                    <div className="div-table-col lab"></div>
                    <div class="div-table-col lab">Employee Name</div>
                    <div class="div-table-col lab">Designation</div>
                    <div class="div-table-col lab">Status</div>
                    <div className="div-table-col lab">Employement Type</div>
                    <div className="div-table-col lab">Employee ID</div>
                    <div className="div-table-col lab">SSS</div>
                    <div className="div-table-col lab">TIN</div>
                    <div className="div-table-col lab">pagIBIG</div>
                    <div className="div-table-col lab">PHILHEALTH</div>
                    <div className="div-table-col lab"></div>

                </div>
                {render ? state.map((val, key) => {
                    return (
                        <div class="div-table-row info" key={key}>
                            <div className="div-table-col icon"><FaRegUserCircle /></div>
                            <div className="div-table-col">
                                <div className="name">
                                    {val.surname} {val.name} {val.middlename}
                                </div>
                            </div>
                            <div className="div-table-col" >
                                <div className="name">
                                    {val.position}
                                </div>

                            </div>
                            <div className="div-table-col">
                                <div className="name">
                                    {val.status}
                                </div>
                            </div>
                            <div className="div-table-col">
                                <div className="name">
                                    {val.employement_type}
                                </div>
                            </div>
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
                                    <AiFillEdit />
                                    Edit
                                </Button>
                                <Button buttonColor='red' onClick={() => {
                                    onDelete(val.id)
                                    }}> 



                                    <AiFillDelete />
                                    Delete
                                </Button>

                            </div>
                        </div>
                    )
                }) : ''}
            </div>

            <Popup trigger={edit} setTrigger={setEdit} click={updateEmp} title={"Add Employee"}>
                <div className="inputt">
                    <div className="fullname">
                        <div className="fname">
                            <p>Fullname:</p>
                        </div>
                        <div className="make-row">
                            {PopupData.map((val, key) => {
                                return (
                                    <div className='contt'>
                                        <label key={key}>
                                            <p>{val.label}</p>
                                            <input type={val.type} name={val.name} placeholder={val.place_holder} onChange={getData} size={val.size}></input>
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="status">
                        <div className="stat">
                            <p>Civil Status:</p>
                        </div>
                        <div className="make-row">
                        {StatusData.map((val, key) =>{
                            return(                               
                                    <div key={key}>
                                        <Button  buttonColor='gray' onClick= {() => tryData(data, val.child)}> 
                                            <p>{val.child}</p>
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="type">
                        <div className="typ">
                            <p>Employment Type:</p>
                        </div>
                        <div className="make-row">
                        {TypeData.map((val, key) =>{
                        return(                               
                                <div key={key}>
                                    <Button buttonColor='gray' onClick= {() => sampleData(data, val.child)}> 
                                    <p>{val.child}</p>
                                    </Button>
                                </div>
                                 );
                                })}
                        </div>

                    </div>
                    <div className="position-rate"> 
                        <div className="pos-rate">
                            <p className="position"> Employee Position: </p>
                            <p className="rate"> Fix Rate: </p>
                        </div>
                    <div className="column">
                    {PositionRate.map((val, key) =>{
                                return(
                                    <div className='long-contt'>
                                        <label className="long" key={key}>
                                            <p>{val.label}</p> 
                                            <input type={val.type} name={val.name} placeholder={val.place_holder} onChange={getData} size={val.size}></input>
                                        </label>
                                    </div>         
                                );
                            })}
                    </div>

                    </div>
                   
                    <div className="statutory">
                        <div className="statutory-label">
                            <p className="TIN">TIN Number:</p>
                            <p className="SSS">SSS Number:</p>
                            <p className="philhealth">PhilHealth Number:</p>
                            <p className="pag-ibig">Pag-Ibig Number:</p>
                        </div>
                        <div className="column">
                        {Statutory.map((val, key) =>{
                            return(
                                <div className='long-contt'>
                                    <label className="long" key={key}>
                                        <p>{val.label}</p> 
                                        <input type={val.type} name={val.name} placeholder={val.place_holder} onChange={getData} size={val.size}></input>
                                    </label>
                                </div>         
                            );
                        })}
                        </div>
                    </div>
                </div>
            </Popup>

            <Notification 
            notify={notify}
            setNotify={setNotify}
            />

        </div>
    )
}
