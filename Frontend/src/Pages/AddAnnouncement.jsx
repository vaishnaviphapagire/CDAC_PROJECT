import React, { useState } from 'react';
import { addAnnouncement } from '../Services/announcement';

export default function AddAnnouncement() {

    const [announcementDescription, setAnnouncementDescription] = useState('');

    const handleAnnouncement = async (e) => {
        e.preventDefault(); // Prevent form submission refresh

        try {
            const result = await addAnnouncement(announcementDescription);
            console.log('Announcement added:', result); // Log the result
            setAnnouncementDescription('');
            alert('Announcement Added');
        } catch (error) {
            console.error('Error adding announcement:', error); // Log the error
            alert('Failed to add announcement');
        }
    };

    return (
        <div className="container-fluid">
            <h2 className="heading">Add Announcement</h2>
            <div className='container'>
                <form onSubmit={handleAnnouncement}>
                    <div className="mb-3 input-group">
                        <label htmlFor="announcementDescription" className="form-label">Announcement Description:</label>
                        <textarea
                            className="input-group"
                            id="announcementDescription"
                            placeholder="Enter announcement description"
                            value={announcementDescription}
                            required
                            onChange={(e) => setAnnouncementDescription(e.target.value)}
                            rows="5"
                            cols="50"
                        />
                    </div>
                   <div className='btn-right-align'>
                       <button type="submit" className="btn btn-bd-primary">Add Announcement</button>
                   </div>
                </form>
            </div>
        </div>
    );
}
