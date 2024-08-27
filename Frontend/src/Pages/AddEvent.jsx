import React, { useState } from 'react';
import { addEvent } from '../Services/event';

export default function AddEvent() {
    // State for each field
    const [eventTitle, setEventTitle] = useState('');
    const [eventDesc, setEventDesc] = useState('');
    const [eventFrom, setEventFrom] = useState('');
    const [eventTo, setEventTo] = useState('');

    
    const handleEvent = async (e) => {
        e.preventDefault(); // Prevent form submission refresh
    
        try {
            // Call the addSubject function with the subjectName
            await addEvent(eventTitle,
                eventDesc,
                eventFrom,
                eventTo);
    
            console.log("New Event Added"); // Log the new event
    
            setEventTitle('');
        setEventDesc('');
        setEventFrom('');
        setEventTo('');
        alert('Event Added');
    
        } catch (error) {
            console.error("Error adding event:", error);
            alert('Failed to add event');
        }
    };

    return (
        <div className="container-fluid">
            <h2 className="heading">Add Event</h2>
            <div className='container'>
                <form onSubmit={handleEvent}>
                    <div className="mb-3 input-group">
                        <label htmlFor="eventTitle" className="form-label">Event Title:</label>
                        <input
                            type="text"
                            className="input-group"
                            id="eventTitle"
                            placeholder="Enter event title"
                            value={eventTitle}
                            required
                            onChange={(e) => setEventTitle(e.target.value)}
                        />
                    </div>

                    <div className="mb-3 input-group">
                        <label htmlFor="eventDesc" className="form-label">Event Description:</label>
                        <textarea
                            className="input-group"
                            id="eventDesc"
                            placeholder="Enter event description"
                            value={eventDesc}
                            required
                            onChange={(e) => setEventDesc(e.target.value)}
                            rows="5" // Adjust the number of visible rows
                        />
                    </div>

                    <div className="mb-3 input-group">
                        <label htmlFor="eventFrom" className="form-label">Event Start Date:</label>
                        <input
                            type="date"
                            className="input-group"
                            id="eventFrom"
                            value={eventFrom}
                            required
                            onChange={(e) => setEventFrom(e.target.value)}
                        />
                    </div>

                    <div className="mb-3 input-group">
                        <label htmlFor="eventTo" className="form-label">Event End Date:</label>
                        <input
                            type="date"
                            className="input-group"
                            id="eventTo"
                            value={eventTo}
                            required
                            onChange={(e) => setEventTo(e.target.value)}
                        />
                    </div>

                    <div className='btn-right-align'>
                    <button type="submit" className="btn btn-bd-primary mb-5">Add Event</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
