import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Ridirect} from 'react-router-dom'

import Homepage from './Homepage'
import Dashboard from './Dashboard'
import Employee from './Employee'
import Payroll from './Payroll'
import Payslip from './Payslip'
import Sidebar from './Sidebar'
import Login from './Login'

export default function Routes() {
    return (
        <Router>
            <div className="exf">
                <Sidebar/>
            </div>
            <Switch>               
                <Route exact path="/" component={Homepage}/>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route exact path="/employee" component={Employee}/>
                <Route exact path="/payroll" component={Payroll}/>
                <Route exact path="/payslip" component={Payslip}/>
                <Route exact path="/login" component={Login}/>
            </Switch>             
        </Router>
    )
}
