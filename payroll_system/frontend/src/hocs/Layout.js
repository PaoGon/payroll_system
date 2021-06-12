import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { connect } from 'react-redux'
import { checkAuthenticated } from '../actions/auth'


function Layout({ children, checkAuthenticated}) {
    useEffect(() => {
        checkAuthenticated()
    }, [])
    

    return (
        <div className='container'>
            <Sidebar/>
            {children}
        </div>
    )
}



export default connect(null, { checkAuthenticated })(Layout)
