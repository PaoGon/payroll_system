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
                            data: [43, 29, 25, 35, 36, 55, 40],
                            fill: {
                                target: 'origin',
                                above: 'rgba(73, 119, 173, 0.4)', 
                              },
                            borderColor: 'rgb(73, 119, 173)',
                            tension: 0.5
                        },
                        {
                            label: 'SSS',
                            data: [65, 30, 40, 11, 56, 55, 29],
                            fill:{
                                target: 'origin',
                                above: 'rgba(69, 123, 165, 0.5)'
                            },
                            borderColor: 'rgb(69, 123, 165)',
                            tension: 0.5
                        },
                        {
                            label: 'Gross Salary',
                            data: [70, 32, 25, 31, 70, 90, 70],
                            fill:{
                                target: 'origin',
                                above: 'rgba(97, 158, 190, 0.8)'
                            },
                            borderColor: 'rgb(97, 158, 190)',
                            tension: 0.5
                        },
                        {
                            label: 'PHILHEALTH',
                            data: [40, 21, 46, 21, 59, 89, 13],
                            fill: true,
                            borderColor: 'rgb(141, 189, 212)',
                            tension: 0.5
                        },
                    ]

                }}
                options={
                    { 
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                display : false
                            }
                          }
                    }
                }
            />
        </>
    )
}

export default LineChart
