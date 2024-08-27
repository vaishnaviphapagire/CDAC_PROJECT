

// import React, { useState } from 'react';

// const initialTimetable = [
//     { time: '8:00 AM - 9:00 AM', Monday: '', Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: '' },
//     { time: '10:00 AM - 11:00 AM', Monday: '', Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: '' },
//     { time: '11:00 AM - 12:00 PM', Monday: '', Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: '' },
//     { time: '12:00 PM - 1:00 PM', Monday: '', Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: '' },
//     { time: '1:00 PM - 2:00 PM', Monday: '', Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: '' },
//     { time: '2:00 PM - 3:00 PM', Monday: '', Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: '' },
// ];

// export default function AddTimetable() {
//     const [timetable, setTimetable] = useState(initialTimetable);
//     const [role, setRole] = useState('student'); // Default role
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');

//     const handleChange = (rowIndex, day, value) => {
//         const newTimetable = timetable.map((row, index) => {
//             if (index === rowIndex) {
//                 return { ...row, [day]: value };
//             }
//             return row;
//         });
//         setTimetable(newTimetable);
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const data = {
//             role,
//             startDate,
//             endDate,
//             timetable,
//         };
//         console.log(data);
//         alert('Timetable saved successfully!');
//         // Here you would send the data to your backend API
//     };

//     return (
//         <div className="container-fluid">
//             <h2 className="mt-4 heading">Weekly Timetable</h2>
//             <div className='container mb-5'>
//             <form onSubmit={handleSubmit} >
//                 <div className='input-group'>
//                     <label>Role:</label>
//                     <select className="input-group" value={role} onChange={(e) => setRole(e.target.value)}>
//                         <option value="student">Student</option>
//                         <option value="teacher">Teacher</option>
//                     </select>
//                 </div>
//                 <div className="input-group">
//                     <label>Start Date:</label>
//                     <input type="date" className="input-group" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
//                 </div>
//                 <div className="input-group">
//                     <label>End Date:</label>
//                     <input type="date" className="input-group" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
//                 </div>
//                 <table className="table table-bordered mt-3">
//                     <thead>
//                         <tr>
//                             <th>Time</th>
//                             <th>Monday</th>
//                             <th>Tuesday</th>
//                             <th>Wednesday</th>
//                             <th>Thursday</th>
//                             <th>Friday</th>
//                             <th>Saturday</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {timetable.map((row, rowIndex) => (
//                             <tr key={rowIndex}>
//                                 <td>{row.time}</td>
//                                 {Object.keys(row).map((day, colIndex) => {
//                                     if (day === 'time') return null;
//                                     return (
//                                         <td key={colIndex}>
//                                             <input
//                                                 type="text"
//                                                 value={row[day]}
//                                                 required
//                                                 onChange={(e) => handleChange(rowIndex, day, e.target.value)}
//                                                 className="form-control"
//                                             />
//                                         </td>
//                                     );
//                                 })}
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 <div className='btn-right-align'>
//                     <button type="submit" className="btn btn-bd-primary">Add Timetable</button>
//                 </div>
//             </form>
//             </div>
//         </div>
//     );
// }


import React, { useState } from 'react';
import { addTimeTable } from '../Services/timeTable'; // Import the function to add timetable

const initialTimetable = [
    { time: '8:00 AM - 9:00 AM', Monday: '', Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: '' },
    { time: '10:00 AM - 11:00 AM', Monday: '', Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: '' },
    { time: '11:00 AM - 12:00 PM', Monday: '', Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: '' },
    { time: '12:00 PM - 1:00 PM', Monday: '', Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: '' },
    { time: '1:00 PM - 2:00 PM', Monday: '', Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: '' },
    { time: '2:00 PM - 3:00 PM', Monday: '', Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: '' },
];

export default function AddTimetable() {
    const [timetable, setTimetable] = useState(initialTimetable);
    //const [role, setRole] = useState('student'); // Default role
    const [role, setRole] = useState('STUDENT'); // Default to one of the backend enum values

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState(null);

    const handleChange = (rowIndex, day, value) => {
        const newTimetable = timetable.map((row, index) => {
            if (index === rowIndex) {
                return { ...row, [day]: value };
            }
            return row;
        });
        setTimetable(newTimetable);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const timeSlot = timetable.map(row => ({
            time: row.time,
            monday: row.Monday,
            tuesday: row.Tuesday,
            wednesday: row.Wednesday,
            thursday: row.Thursday,
            friday: row.Friday,
            saturday: row.Saturday
        }));

        try {
            await addTimeTable(role, startDate, endDate, timeSlot);
            alert('Timetable saved successfully!');
            // Optionally reset form fields
            setTimetable(initialTimetable);
            setRole('STUDENT');
            setStartDate('');
            setEndDate('');
        } catch (error) {
            setError('Failed to save timetable');
            console.error('Error adding timetable:', error);
        }
    };

    return (
        <div className="container-fluid">
            <h2 className="mt-4 heading">Weekly Timetable</h2>
            <div className='container mb-5'>
                <form onSubmit={handleSubmit}>
                    <div className='input-group'>
                        <label>Role:</label>
                        <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="STUDENT">STUDENT</option>
                            <option value="TEACHER">TEACHER</option>
                        </select>


                    </div>
                    <div className="input-group mt-2">
                        <label>Start Date:</label>
                        <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div className="input-group mt-2">
                        <label>End Date:</label>
                        <input type="date" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                    <table className="table table-bordered mt-3">
                        <thead>
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
                                    {Object.keys(row).map((day, colIndex) => {
                                        if (day === 'time') return null;
                                        return (
                                            <td key={colIndex}>
                                                <input
                                                    type="text"
                                                    value={row[day]}
                                                    required
                                                    onChange={(e) => handleChange(rowIndex, day, e.target.value)}
                                                    className="form-control"
                                                />
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {error && <p className="text-danger">{error}</p>}
                    <div className='btn-right-align mt-3'>
                        <button type="submit" className="btn btn-bd-primary">Add Timetable</button>
                    </div>
                </form>
            </div>
        </div>
    );
}