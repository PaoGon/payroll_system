import React from 'react'

import { Doughnut } from 'react-chartjs-2'

function DoughnutCharts() {
    return (
        <>
            <Doughnut
                data = {{
                    labels: [
                        'SSS',
                        'pagIbig',
                        'PHILHEALTH',
                        'Gross'
                      ],
                      datasets: [{
                        label: 'My First Dataset',
                        data: [300, 50, 100, 150],
                        backgroundColor: [
                          'rgb(73, 119, 173)',
                          'rgb(69, 123, 165)',
                          'rgb(97, 158, 190)',
                          'rgb(141, 189, 212)'
                        ],
                        hoverOffset: 4
                      }],
                }}
                width={"30%"}
                options={{ maintainAspectRatio: false }}
            />
        </>
    )
}

export default DoughnutCharts
