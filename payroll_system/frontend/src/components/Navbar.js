import React, { useState, Fragment } from 'react'
import { NavLink } from 'react-router-dom'

import { connect } from 'react-redux'
import { logout } from '../actions/auth'


import {SideBarData} from './SideBarData'
import {FaBars, FaTimes} from 'react-icons/fa'
import{IoSearch} from 'react-icons/io5'
import EmployeeSearch from './EmployeeSearch'




function Navbar({ isAuthenticated, logout, isAdmin, path, status}) {
    
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const [state, setState] = useState([]);

    //? for the responsivness
    const [act, setAct] = useState(false);
    const [navs, setNavs] = useState(true)

    //!send this state to the data class of employee to render the search
    const [trigSearch, setTrigSearch] = useState(false)

    // !triggers render
    const [rend, setRend] = useState(false);


    
    //?gets the input in search bar
    function get_search(val){
        setState(val.target.value);
    }
    

    function on_press(){
         console.log(state)
         setRend(true)
         setTrigSearch(true)
    }
   
    // //?check the size of the screen
    function show_menu_bars(){
        if(window.innerWidth <= 1000){
            setAct(true)
            setNavs(false)
        }
        else{
            setAct(false)
            setNavs(true)
        }
    }

    window.addEventListener('resize', show_menu_bars)
    window.onload = () => show_menu_bars();



    return (
        <>
            <nav className="navbar">
                <Fragment>
                    <div className="clk">   
                        <NavLink  to='/dashboard'>Vertex One</NavLink>
                    </div>

                    {isAuthenticated ?
                        isAdmin == 'admin' || status == 'admin'  ? 
                            <Fragment>
                                {SideBarData.map((val, key) =>{
                                    return (
                                        <NavLink className="ic" key={key} to={val.link} >
                                            <div className="nav-icon">{val.icon}</div>
                                            <div className="nav-title">{val.title}</div>
                                        </NavLink>
                                    );
                                })}
                                <li className="ic">
                                    <a className="nav-title" onClick={() => {
                                        logout()
                                        window.location.pathname = "/login"

                                    }}  href='#!'>Logout</a>
                                </li>
                            </Fragment>
                        
                        : 
                            <Fragment>
                                <li className="ic">
                                    <NavLink className="nav-title" to='/attendance'>Attendance</NavLink>
                                </li>
                                <li className="ic">
                                    <NavLink className="nav-title" to='/payslip'>Payslip</NavLink>
                                    
                                </li>
                                <li className="ic">
                                    <a className="nav-title" onClick={() => {
                                        logout()
                                        window.location.pathname = "/login"
                                    }}  href='#!'>Logout</a>
                                </li>
                            </Fragment>
                        
                       
                    : 
                        <Fragment>
                            <li className="ic">
                                <NavLink className="nav-title" to='/login'>Login</NavLink>
                            </li>
                        </Fragment>
                    }
                </Fragment>


                {/* search bar */}
                {path === '/employee' && isAuthenticated ? 

                    <Fragment>
                        {console.log(window.location.pathname)}
                        <div className="search-box">
                            <input type='text' name='search' onChange={get_search  } placeholder='Search Employee'/>
                        </div>
                        <div className="xx" onClick={on_press} id={act ? '' : 'xx-act'}>
                            <IoSearch/>
                        </div>
                        <EmployeeSearch state={state} rend={rend} setRend={setRend} trigSearch={trigSearch} setTrigSearch={setTrigSearch}/>
                    </Fragment>

                : ''}


            {/* menu bars */}
                {act ? 
                        <div className="menu-bars" onClick={showSidebar}>
                            {sidebar ? <FaTimes/> : <FaBars/>}
                        </div>  
                : ''}
            </nav>
            
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
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isAdmin: state.auth.status,
    status: state.profile.status
})
export default connect(mapStateToProps, { logout })(Navbar)
