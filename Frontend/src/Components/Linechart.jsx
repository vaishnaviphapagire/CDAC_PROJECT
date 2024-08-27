// import React,{useState} from 'react';
// import Chart from 'react-apexcharts';
// //install : npm install react-apexcharts apexcharts//
// function Linechart()
// {
//     const[score, setScore]= useState( //render the data from database 
//         [
//             {
//                 name:"My Score",
//                 data:[12,10,17,8,20,15]
//             },
//             {
//               name:"Max marks scored in class",
//               data:[17,18,17,20,20,19]
//             },
//             {
//               name:"Min marks scored in class",
//               data:[5,7,2,3,8,5]
//             }
//         ]
//     );

//     const[option, setOption]= useState( //Render the quiz titles from database
//         {
//             stroke: {               
//                 curve: 'straight',
//                 lineCap: 'round',
//                 width : 2
//                 // OR provide an array
//                // curve: ['straight', 'smooth', 'monotoneCubic', 'stepline']
//               },
//             //   chart: {
//             //     background: '#EBF1FF'
//             // },
//             colors: ['#1A2130', '#83B4FF','#5A72A0'],           
//             title:{ text:"My Progress in class"},
//             xaxis:{
//                 title:{text:"Quizes"},
//                 categories:['Quiz1','Quiz2','Quiz3','Quiz4','Quiz5','Quiz6']
//             },
//             yaxis:{
//                 title:{text:"Marks"}                 
//             }

//         }
//     );

//     return(<React.Fragment>
//         <div className='container-fluid mt-3 mb-3'>
                   
//           <Chart type='area' 
//          height={500}
                     
//           series={score}
//           options={option }
//           >
//           </Chart>

//         </div>
//     </React.Fragment>);
// }

// export default Linechart;

import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import config from '../config';
import { useSelector } from 'react-redux';

// Fetch MinMax data
async function fetchMinMaxData(userId) {
    try {
        const response = await axios.get(`${config.url}/result/getMinMaxData/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching min-max data:', error);
        return [];
    }
}

function Linechart() {

    const user = useSelector((state)=> state.user)
    const [score, setScore] = useState([
        {
            name: "My Score",
            data: [] // Default data if API call fails
        },
        {
            name: "Max marks scored in class",
            data: [] // Default data if API call fails
        },
        {
            name: "Min marks scored in class",
            data: [] // Default data if API call fails
        }
    ]);

    const [option, setOption] = useState({
        stroke: {               
            curve: 'straight', // Changed to 'straight' for straight lines
            lineCap: 'round',
            width: 2
        },
        colors: ['#1A2130', '#83B4FF', '#5A72A0'],           
        title: { text: "My Progress in class" },
        xaxis: {
            title: { text: "Quizzes" },
            categories: [] // Default categories if API call fails
        },
        yaxis: {
            title: { text: "Marks" }                 
        }
    });

    useEffect(() => {
        const userId = user.loginId; // Replace with actual user ID from login context or store

        const fetchData = async () => {
            const data = await fetchMinMaxData(userId);

            if (data.length > 0) {
                const quizzes = data.map(item => item.title);
                const maxScores = data.map(item => item.max);
                const minScores = data.map(item => item.min);
                const obtainedScores = data.map(item => item.obtained_marks);

                setOption(prevOption => ({
                    ...prevOption,
                    xaxis: { categories: quizzes }
                }));

                setScore([
                    { name: "My Score", data: obtainedScores },
                    { name: "Max marks scored in class", data: maxScores },
                    { name: "Min marks scored in class", data: minScores }
                ]);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='container-fluid mt-3 mb-3'>
            <Chart
                type='area'
                height={500}
                series={score}
                options={option}
            />
        </div>
    );
}

export default Linechart;
