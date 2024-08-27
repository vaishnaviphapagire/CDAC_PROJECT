import React, { useState } from 'react';
import Chart from 'react-apexcharts';

function ResLinechart() {
    // Example data: Average quiz marks for quizzes 1 through 6
    const [data, setData] = useState([
        { quizNo: 1, average: 85 },
        { quizNo: 2, average: 90 },
        { quizNo: 3, average: 78 },
        { quizNo: 4, average: 88 },
        { quizNo: 5, average: 92 },
        { quizNo: 6, average: 81 }
    ]);

    // Chart options
    const options = {
        chart: {
            id: 'line-chart',
            toolbar: {
                show: false
            }
        },
        xaxis: {
            categories: data.map(item => `Quiz ${item.quizNo}`), // X-axis labels (Quiz numbers)
        },
        colors: ['#1f77b4'], // Line color
        dataLabels: {
            enabled: false // Disables data labels on the chart
        },
        markers: {
            size: 6, // Size of the markers
            colors: ['#1f77b4'], // Marker color
            strokeColors: '#fff', // Border color of the markers
            strokeWidth: 2, // Border width of the markers
            hover: {
                size: 10, // Size of the markers on hover
                sizeOffset: 3 // Offset on hover
            }
        },
        grid: {
            borderColor: '#ebedf2',
        },
        stroke: {
            curve: 'smooth' // Smoothens the line
        },
        tooltip: {
            enabled: true,
            shared: true,
            intersect: false
        },
        title: {
            text: 'Average Quiz Marks',
            align: 'left',
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#333'
            }
        }
    };

    // Chart series
    const series = [
        {
            name: 'Average Marks',
            data: data.map(item => item.average) // Series data (average marks)
        }
    ];

    return (
        <div className='container-fluid mt-3 mb-3'>
            <Chart
                type='line'
                height={400}
                series={series}
                options={options}
            />
        </div>
    );
}

export default ResLinechart;
