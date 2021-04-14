import React from 'react'
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import PaymentRoundedIcon from '@material-ui/icons/PaymentRounded';

export const SideBarData = [
    {
        title: "Dashboard",
        icon: <DashboardRoundedIcon/>,
        link: "/dashboard"
    },

    {
        title: "Employee",
        icon: <ListAltRoundedIcon/>,
        link: "/employee"
    },


    {
        title: "Payroll",
        icon: <PaymentRoundedIcon/>,
        link: "/payroll"
    }

]
