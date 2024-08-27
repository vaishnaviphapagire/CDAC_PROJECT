


// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux'; // Import useSelector to access Redux state
// import axios from 'axios';
// import config from '../config';
// import { addTimeTable } from '../Services/timeTable' // Import the addTimeTable function

// const Timetable = () => {
//     const role = useSelector(state => state.user.loginRole); // Get role from Redux store
//     const [timetable, setTimetable] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // Form state
//     const [form, setForm] = useState({
//         startDate: '',
//         endDate: '',
//         timeSlot: ''
//     });

//     useEffect(() => {
//         const fetchTimetable = async () => {
//             setLoading(true);
//             try {
//                 // Fetch timetable data based on the role
//                 const response = await axios.get(`${config.url}/timeTable`, { params: { role } });
//                 setTimetable(response.data);
//             } catch (error) {
//                 setError('Failed to load timetable');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchTimetable();
//     }, [role]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setForm(prevForm => ({
//             ...prevForm,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await addTimeTable(role, form.startDate, form.endDate, form.timeSlot);
//             // Refresh timetable after successful addition
//             const response = await axios.get(`${config.url}/timeTable`, { params: { role } });
//             setTimetable(response.data);
//             setForm({
//                 startDate: '',
//                 endDate: '',
//                 timeSlot: ''
//             });
//             alert('Timetable added successfully');
//         } catch (error) {
//             setError('Failed to add timetable');
//         }
//     };

//     if (loading) return <p>Loading timetable...</p>;
//     if (error) return <p>Error: {error}</p>;

//     return (
//         <div className="container-fluid mt-3 mb-3">
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label htmlFor="startDate">Start Date</label>
//                     <input 
//                         type="date" 
//                         id="startDate" 
//                         name="startDate" 
//                         value={form.startDate} 
//                         onChange={handleChange} 
//                         required 
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="endDate">End Date</label>
//                     <input 
//                         type="date" 
//                         id="endDate" 
//                         name="endDate" 
//                         value={form.endDate} 
//                         onChange={handleChange} 
//                         required 
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="timeSlot">Time Slot</label>
//                     <input 
//                         type="text" 
//                         id="timeSlot" 
//                         name="timeSlot" 
//                         value={form.timeSlot} 
//                         onChange={handleChange} 
//                         required 
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary">Add Timetable</button>
//             </form>

//             <table className="table table-striped table-responsive mt-3">
//                 <thead>
//                     <tr>
//                         <th>Time</th>
//                         <th>Monday</th>
//                         <th>Tuesday</th>
//                         <th>Wednesday</th>
//                         <th>Thursday</th>
//                         <th>Friday</th>
//                         <th>Saturday</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {timetable.map((row, rowIndex) => (
//                         <tr key={rowIndex}>
//                             <td>{row.time}</td>
//                             <td>{row.Monday}</td>
//                             <td>{row.Tuesday}</td>
//                             <td>{row.Wednesday}</td>
//                             <td>{row.Thursday}</td>
//                             <td>{row.Friday}</td>
//                             <td>{row.Saturday}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default Timetable;


import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getTimeTable } from '../Services/timeTable';

const Timetable = () => {
    const role = useSelector(state => state.user.loginRole); 
    const [timetable, setTimetable] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTimetable = async () => {
            setLoading(true);
            try {
                const data = await getTimeTable(role); 
                setTimetable(data.timeSlot);
            } catch (error) {
                setError('Failed to load timetable');
            } finally {
                if(timetable===null || timetable===undefined)
                setLoading(false);
            }
        };

        fetchTimetable();
    }, [role]);

    if (!loading) return <p>Loading timetable...</p>;
    if (error) return <p>Error: {error}</p>;

    if(timetable != null || timetable != undefined)
    return (
        <div className="container-fluid mt-3 mb-3">
            <table className="table table-bordered table-hover custom-table shadow mb-5">
                <thead className="table-heading">
                    <tr>
                        <th>Time</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                    </tr>
                </thead>
                <tbody>
                    {timetable.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td>{row.time}</td>
                            <td>{row.monday}</td>
                            <td>{row.tuesday}</td>
                            <td>{row.wednesday}</td>
                            <td>{row.thursday}</td>
                            <td>{row.friday}</td>
                            <td>{row.saturday}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Timetable;