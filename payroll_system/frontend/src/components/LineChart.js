import React from 'react'

import { Line } from 'react-chartjs-2'

function LineChart() {

    return (
        <>
            <Line
                data = {{

                    labels: [
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                    ],
                    datasets: [
                        {
                            label: 'PagIBIG',
                            data: [65, 59, 80, 81, 56, 55, 40],
                            fill: true,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.5
                        },
                        {
                            label: 'SSS',
                            data: [65, 30, 40, 11, 56, 55, 29],
                            fill: true,
                            borderColor: 'rgb(73, 119, 173)',
                            tension: 0.5
                        },
                        {
                            label: 'Gross Salary',
                            data: [70, 32, 25, 31, 70, 90, 29],
                            fill: true,
                            borderColor: 'rgb(73, 119, 173)',
                            tension: 0.5
                        },
                        {
                            label: 'PHILHEALTH',
                            data: [40, 21, 46, 21, 59, 89, 13],
                            fill: true,
                            borderColor: 'rgb(73, 119, 173)',
                            tension: 0.5
                        },
                    ]

                }}
                width={"30%"}
                options={
                    { 
                         
                        options: {
                            responsive: true,
                            scales: {
                              xAxes: [{
                                gridLines: {
                                  display: true
                                }
                              }],
                              yAxes: [{
                                gridLines: {
                                  display: false
                                }
                              }]
                              }
                        },
                  
                        maintainAspectRatio: false,
                    }
                }
            />
        </>
    )
}

export default LineChart
