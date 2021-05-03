import React from 'react'
import Sidebar from './Sidebar'
import DoughnutCharts from './DoughnutCharts'
import LineChart from './LineChart'

export default function Dashboard() {
    return (
        <div className="dashboard">
            <div className="card">

            </div>
            <div className="charts">
                <div className="area">
                    <div className="lab">
                        <p>Monthly Expenses</p>
                    </div>
                    <div className="line-val">

                    </div>
                    <div className="line-chart">
                        <LineChart/>
                    </div>
                    
                </div>

                <div className="doug">
                    <div className="lab">
                        <p>Expenses</p>
                    </div>
                    <div className="val">
                        <h1>$ 395k</h1>
                    </div>
                    <div className="doug-chart">
                        <DoughnutCharts/>
                    </div>
                   
                </div>

            </div>
        </div>
    )
}

