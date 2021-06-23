import React, {useState} from 'react'
import Cookies from 'js-cookie'
import {Button} from './Button.js'
import {FaRegUserCircle} from 'react-icons/fa'
import {AiFillEdit} from 'react-icons/ai'
import {AiFillDelete} from 'react-icons/ai'
import {FaTimes} from 'react-icons/fa'
import {PopupData} from './PopupData'

import Popup from './Popup'

export default function EmployeeSearch(props) {

    // stores searched data
    const [search, setSearch] = useState();
    const [activate, setActivate] = useState(false)


    
    // triggers edit action
    const[edit, setEdit] = useState(false);

    // stores the ID of the selected employee
    const[id, setId] = useState();

    // stores the data of the edit
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

    // gets the data of the edit fields
    function getData(val){
        setData({
            ...data,
            [val.target.name]: val.target.value
        });
        
    }


    function getSearch(search_key){
        fetch(`/api/search-employee?search=${search_key}`)
        .then((response)=> response.json())
        .then((data) => setSearch(data))
        .then(() => setActivate(true))
        .then(() => props.setRend(false))
        .catch(err => console.log(err));
    }

    function deleteEmp(id){
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get('csrftoken')
            },
            cache: "no-cache"
        };
        fetch(`/api/delete-employee?id=${id}`, requestOptions)
        .then(() => props.setTrigSearch(false))
        .catch(err => console.log(err));  
    }

    function updateEmp(){
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
        .then(() => getSearch(props.state))
        .then(() => setEdit(false))
        .catch(err => console.log(err));  

    }

    return (props.trigSearch) ?(
        <div className="popup">
            <div className="ext">
                <div className="popup-inner-search">
                {props.rend ? getSearch(props.state): ''}
                <div className="ss" >
                    <h1>Search Result</h1>
                    <div className="exit" onClick={() => props.setTrigSearch(false)}><FaTimes/>
                    </div>
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
                            <div className="div-table-col icon">
                                <FaRegUserCircle/>
                            </div>
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
                                        setId(val.id)}}>
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
                            
    ): '';
}
