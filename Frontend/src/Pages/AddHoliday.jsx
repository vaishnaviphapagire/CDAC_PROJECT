import React, { useState } from 'react';
import { addHoliday } from '../Services/holiday';

export default function AddHoliday() {
    // State for each field
    const [holidayTitle, setHolidayTitle] = useState('');
    const [holidayFrom, setHolidayFrom] = useState('');
    const [holidayTo, setHolidayTo] = useState('');

    // Handle form submission
    const handleHoliday = async (e) => {
        e.preventDefault(); // Prevent form submission refresh
    
        try {
            // Call the addSubject function with the subjectName
            await addHoliday( holidayTitle,
                holidayFrom,
                holidayTo);
    
            console.log("New Event Added"); // Log the new event
    
            setHolidayTitle('');
            setHolidayFrom('');
            setHolidayTo('');
       
        alert('Holiday Added');
    
        } catch (error) {
            console.error("Error adding holiday:", error);
            alert('Failed to add holiday');
        }
    };

    return (
        <div className="container py-4">
            <h2 className="heading">Add Holiday</h2>
            <div className='container'>
                <form onSubmit={handleHoliday}>
                    <div className="mb-3 input-group">
                        <label htmlFor="holidayTitle" className="form-label">Holiday Title:</label>
                        <input
                            type="text"
                            className="input-group"
                            id="holidayTitle"
                            placeholder="Enter holiday title"
                            value={holidayTitle}
                            onChange={(e) => setHolidayTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3 input-group">
                        <label htmlFor="holidayFrom" className="form-label">Holiday Start Date:</label>
                        <input
                            type="date"
                            className="input-group"
                            id="holidayFrom"
                            value={holidayFrom}
                            onChange={(e) => setHolidayFrom(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3 input-group">
                        <label htmlFor="holidayTo" className="form-label">Holiday End Date:</label>
                        <input
                            type="date"
                            className="input-group"
                            id="holidayTo"
                            value={holidayTo}
                            
                            onChange={(e) => setHolidayTo(e.target.value)}
                            required
                        />
                    </div>

                    <div className='btn-right-align'>
                    <button type="submit" className="btn btn-bd-primary">Add Holiday</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
