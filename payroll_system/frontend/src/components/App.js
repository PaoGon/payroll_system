import React from "react";
import { render } from "react-dom";

import { BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'

import { Provider } from 'react-redux'
import store from '../store'

import Layout from '../hocs/Layout'

import Homepage from './Homepage'
import Dashboard from './Dashboard'
import Employee from './Employee'
import Payroll from './Payroll'
import Payslip from './Payslip'
import Login from './Login'
import PrivateRoute from "../hocs/PrivateRoute";

export default function App() {

    return (
        <Provider store={store}>
            <Router>
                <Layout>
                    <PrivateRoute exact path="/" component={Homepage}/>
                    <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                    <PrivateRoute exact path="/employee" component={Employee}/>
                    <PrivateRoute exact path="/payroll" component={Payroll}/>
                    <PrivateRoute exact path="/payslip" component={Payslip}/>
                    <Route exact path="/login" component={Login}/>

                </Layout>
            </Router>
        </Provider>
    )
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
