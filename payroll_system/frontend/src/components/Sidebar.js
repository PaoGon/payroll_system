import React, { useState } from 'react'
import {SideBarData} from './SideBarData'
import {FaBars, FaTimes} from 'react-icons/fa'
import{IoSearch} from 'react-icons/io5'
import EmployeeSearch from './EmployeeSearch'


export default function Sidebar() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const [state, setState] = useState([]);

    //send this state to the data class of employee to render the search
    const [trigSearch, setTrigSearch] = useState(false)

    //lagay mo to
    const [rend, setRend] = useState(false);
    
    //gets the input in search bar
    function getSearch(val){
        setState(val.target.value);
    }
    
    function onPress(){
         console.log(state)
         setRend(true)
         setTrigSearch(true)
    }
    return (
        <>
            <div className="navbar">
                <div className="cont">
                    <h1 className="clk" onClick={() => {window.location.pathname = "/dashboard"}}>Vertex One</h1>
                </div>
                
                <div className="bx">
                    <div className="search-box">
                        <input type='text' name='search' onChange={getSearch}/>
                    </div>
                    <div className="xx" onClick={onPress}>
                        <IoSearch/>
                    </div>
                    <EmployeeSearch state={state} rend={rend} setRend={setRend} trigSearch={trigSearch} setTrigSearch={setTrigSearch}/>
                    <div className="menu-bars" onClick={showSidebar}>
                        {sidebar ? <FaTimes/> : <FaBars/>}
                    </div>
                </div>
                
            </div>
            <div className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <div className="shape">
                    <div className="inner">
                        <h1 className="title">Logo</h1>
                    </div>
                </div>
                <ul className="SidebarList">
                    {SideBarData.map((val, key) =>{
                        return (
                            <li className="row" id={window.location.pathname == val.link ? "active": ""}
                            key={key} onClick={() => {window.location.pathname = val.link}}>
                                <div id="icon">{val.icon}</div>
                                <div id="title">{val.title}</div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    )
}
