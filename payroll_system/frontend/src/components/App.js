import React,{ useState } from "react";
import { render } from "react-dom";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import store from '../store'

import Layout from '../hocs/Layout'

import Homepage from './Homepage'
import Dashboard from './Dashboard'
import Employee from './Employee'
import Payroll from './Payroll'
import Login from './Login'
import User from "./User";
import Attendance from "./Attendance";
import EmpPayslip from "./EmpPayslip";
import PrivateRoute from "../hocs/PrivateRoute";

export default function App() {
    const [path, setPath] = useState('')

    return (
        <Provider store={store}>
            <Router>
                <Layout path={path}>
                    <Switch>
                        <Route exact path="/login" component={Login}/>
                        <Route  exact path="/" component={Homepage}/>
                        
                        
                        <PrivateRoute exact path='/dashboard' component={Dashboard} setPath={setPath}/>   
                        <PrivateRoute exact path='/payroll' component={Payroll} setPath={setPath}/>
                        <PrivateRoute exact path='/employee' component={Employee} setPath={setPath}/>
                           
                        <PrivateRoute exact path="/user" component={User} setPath={setPath}/>
                        <PrivateRoute exact path="/attendance" component={Attendance} setPath={setPath}/>
                        <PrivateRoute exact path="/payslip" component={EmpPayslip} setPath={setPath}/>
                        
                    </Switch>    
                </Layout>
            </Router>
        </Provider>
    )
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);