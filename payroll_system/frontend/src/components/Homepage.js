import React from 'react'
import Dashboard from './Dashboard'
import Employee from './Employee'
import Payroll from './Payroll'
import Payslip from './Payslip'
import Sidebar from './Sidebar'
import { BrowserRouter as Router, Switch, Route, Link, Ridirect} from 'react-router-dom'

export default function Homepage() {
    return (
        <Router>
            <Sidebar/>
            <Switch>
                <Route exact path="/"></Route>
                <Route exact path="/dashboard" component={Dashboard}></Route>
                <Route exact path="/employee" component={Employee}></Route>
                <Route exact path="/payroll" component={Payroll}></Route>
                <Route exact path="/payslip" component={Payslip}></Route>
            </Switch> 
        </Router>
    )
}


