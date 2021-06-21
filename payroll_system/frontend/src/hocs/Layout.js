import React, { useEffect, } from 'react'
import Navbar from '../components/Navbar'
import { connect } from 'react-redux'
import { checkAuthenticated } from '../actions/auth'
import { load_user } from '../actions/profile'

function Layout({ children, checkAuthenticated, path, load_user}) {
    useEffect(() => {
        checkAuthenticated()
        load_user()
    }, [])

    
    return (
        <div className='container'>
            <Navbar path={path}/>
            {children}
        </div>
    )
}



export default connect(null, { checkAuthenticated, load_user })(Layout)
