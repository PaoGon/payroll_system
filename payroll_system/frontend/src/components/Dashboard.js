import React from 'react'
import Sidebar from './Sidebar'
import DoughnutCharts from './DoughnutCharts'
import LineChart from './LineChart'
import {CardsData} from './CardsData'

export default function Dashboard() {
    return (
        <div className="dashboard">
            <div className="dash-card">

                {CardsData.map((val, key) => {
                    return(
                        <div className="card" key={key}>
                            <div className="line-label">
                                <p>{val.label}</p>
                                <h1>{val.val}</h1>
                            </div>
                            <div className="dash-ico" id={val.id}>
                                {val.img}
                            </div>
                        </div>
                    )
                })}


            </div>
            <div className="charts">
                <div className="area">
                    <div className="lab">
                        <p>Monthly Expenses</p>
                    </div>
                    <div className="line-val">
                        <div className="line-label">
                            <p>PagIBIG</p>
                            <h1>$ 40k</h1>
                        </div>
                        <div className="line-label">
                            <p>SSS</p>
                            <h1>$ 29k</h1>
                        </div>
                        <div className="line-label">
                            <p>Gross Salary</p>
                            <h1>$ 70k</h1>
                        </div>
                        <div className="line-label">
                            <p>PHILHEALTH</p>
                            <h1>$ 13k</h1>
                        </div>

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

