import React from 'react'

import { Doughnut } from 'react-chartjs-2'

function DoughnutCharts() {
    return (
        <>
            <Doughnut
                data = {{
                    labels: [
                        'SSS',
                        'PagIBIG',
                        'PHILHEALTH',
                        'Gross'
                      ],
                      datasets: [{
                        label: 'My First Dataset',
                        data: [300, 50, 100, 150],
                        backgroundColor: [
                          'rgb(97, 151, 233)',
                          'rgb(55, 129, 241)',
                          'rgb(195, 195, 213)',
                          'rgb(82, 207, 255)'
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
