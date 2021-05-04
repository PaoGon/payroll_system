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
                                above: 'rgba(55, 129, 241, 0.8)', 
                              },
                            borderColor: 'rgb(55, 129, 241)',
                            tension: 0.5
                        },
                        {
                            label: 'SSS',
                            data: [65, 30, 40, 11, 56, 55, 29],
                            fill:{
                                target: 'origin',
                                above: 'rgba(97, 151, 233, 0.8)'
                            },
                            borderColor: 'rgb(97, 151, 233)',
                            tension: 0.5
                        },
                        {
                            label: 'Gross Salary',
                            data: [70, 32, 25, 31, 65, 85, 70],
                            fill:{
                                target: 'origin',
                                above: 'rgba(82, 207, 255, 0.8)'
                            },
                            borderColor: 'rgb(82, 207, 255)',
                            tension: 0.5
                        },
                        {
                            label: 'PHILHEALTH',
                            data: [46, 26, 36, 46, 56, 79, 46],
                            fill:{
                                target: 'origin',
                                above: 'rgba(195, 195, 213, 0.8)'
                            },
                            borderColor: 'rgb(195, 195, 213)',
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
