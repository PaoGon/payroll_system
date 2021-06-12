import React, { useState, Fragment } from 'react'
import {Link, NavLink} from 'react-router-dom'
import {SideBarData} from './SideBarData'
import {FaBars, FaTimes} from 'react-icons/fa'
import{IoSearch} from 'react-icons/io5'
import EmployeeSearch from './EmployeeSearch'

import { connect } from 'react-redux'
import { logout } from '../actions/auth'
import { BiWindows } from 'react-icons/bi'


function Sidebar({ isAuthenticated, logout }) {
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
                        <h1 id={act ? 'clk-act' : ''} onClick={() => {window.location.pathname = "/dashboard"}}>
                            Vertex One
                        </h1>

                    </div>
                    
                    {isAuthenticated ?
                        <Fragment>
                            {SideBarData.map((val, key) =>{
                                return (
                                    <div className="ic" key={key} onClick={() => {window.location.pathname = val.link}}>
                                        <div className="nav-icon">{val.icon}</div>
                                        <div className="nav-title">{val.title}</div>
                                    </div>
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
                                <NavLink className="nav-title" to='/login'>Login</NavLink>
                            </li>
                        </Fragment>
                    }
                </Fragment>
                
                {/* search bar */}

                {isAuthenticated ? 
                    <Fragment>
                    <div className="search-box">
                        <input type='text' name='search' onChange={get_search  } placeholder='Search Employee'/>
                    </div>
                    <div className="xx" onClick={on_press} id={act ? '' : 'xx-act'}>
                        <IoSearch/>
                    </div>
                    <EmployeeSearch state={state} rend={rend} setRend={setRend} trigSearch={trigSearch} setTrigSearch={setTrigSearch}/>
                        
                    {/* menu bars */}
                    {act ? 
                        <div className="menu-bars" onClick={showSidebar}>
                            {sidebar ? <FaTimes/> : <FaBars/>}
                        </div>  
                    : ''}
                    </Fragment>              
                                    
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
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { logout })(Sidebar)
