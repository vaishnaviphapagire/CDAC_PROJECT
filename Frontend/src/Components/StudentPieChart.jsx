
import React from 'react';
import Chart from 'react-apexcharts';

function StudentPiechart({ data }) {
    // Default data if no data is provided
    const chartData = [
        { name: "Correct", value: data.correct || 0 },
        { name: "Incorrect", value: data.incorrect || 0 },
        { name: "Not Attempted", value: data.notAttempted || 0 }
    ];

    const options = {
        labels: chartData.map(item => item.name),
        colors: ['#4caf50', '#f44336', '#9e9e9e'],
        legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
            verticalAlign: 'middle',
            formatter: function (val, opts) {
                return val + " - " + opts.w.globals.series[opts.seriesIndex];
            },
            offsetX: 0,
            offsetY: 0,
            itemMargin: {
                horizontal: 10,
                vertical: 5
            }
        }
    };

    return (
        <div className='container-fluid mt-3 mb-3'>
            <Chart
                type='pie'
                height={400}
                series={chartData.map(item => item.value)}
                options={options}
            />
        </div>
    );
}

export default StudentPiechart;
