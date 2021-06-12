import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { connect } from 'react-redux'
import { checkAuthenticated } from '../actions/auth'
import Login from '../components/Login'


function Layout({ children, checkAuthenticated, isAuthenticated}) {
    const [log, setLog] = useState(false)
    useEffect(() => {
        checkAuthenticated()
    }, [])
    
    if(isAuthenticated){
       setLog(true)
    }

    return (
        <div className='container'>
            <Sidebar/>
            {log? 
                {children}
            :
                <Login/>
            }
            
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps, { checkAuthenticated })(Layout)
