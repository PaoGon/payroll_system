import React, {useState} from 'react'
import {Button} from './Button.js'
import {FaRegUserCircle} from 'react-icons/fa'
import {AiFillEdit} from 'react-icons/ai'
import {AiFillDelete} from 'react-icons/ai'
import {FaTimes} from 'react-icons/fa'

export default function EmployeeSearch(props) {

    // stores searched data
    const [search, setSearch] = useState();
    const [activate, setActivate] = useState(false)

    function getSearch(search_key){
        fetch(`/search-employee?search=${search_key}`)
        .then((response)=> response.json())
        .then((data) => setSearch(data))
        .then(() => setActivate(true))
        .then(() => props.setRend(false))
        .catch(err => console.log(err));
    }

    function deleteEmp(id){
        const requestOptions = {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            cache: "no-cache"
        };
        fetch(`/delete-employee?id=${id}`, requestOptions)
        .then(() => props.setTrigSearch(false))
        .catch(err => console.log(err));  
    }

    return (props.trigSearch) ?(
        <div className="popup">
            <div className="ext">
            <div className="popup-inner-search">
                {props.rend ? getSearch(props.state): ''}
                <div className="ss" >
                    <h1>Search Result</h1>
                    <div className="exit" onClick={() => props.setTrigSearch(false)}><FaTimes/></div>
                    
                    
                </div>
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
                </div>
                {activate ? search.map((val, key) => {
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
                                <Button buttonColor='green'>
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
                    }) : ''}
            </div>
            </div>
        </div>
                            
    ): '';
}
