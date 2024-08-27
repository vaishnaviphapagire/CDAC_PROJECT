import React, { useState } from 'react';
import { addBatch } from '../Services/batch';


export default function AddBatch() {
    const [batchName, setBatchName] = useState('');
    const [batchCount, setBatchCount] = useState('');
  
    
    const handleBatch = async (e) => {
        e.preventDefault(); // Prevent form submission refresh
    
        try {
            // Call the addSubject function with the subjectName
            await addBatch(batchName,batchCount);
    
            console.log("New Subject Added"); // Log the new event
    
            setBatchCount('');
            setBatchName('');
            alert('Batch Added');
    
        } catch (error) {
            console.error("Error adding batch:", error);
            alert('Failed to add batch');
        }
    };
    

    //const eventTypes = ['Event', 'Holiday', 'Announcement'];

    return (
        <div className="container py-4">
            <h2 className="heading">Add Batch</h2>
            <div className='container'>
            <form onSubmit={handleBatch}>
            <div className="mb-3 input-group">
                    <label htmlFor="BatchName" className="form-label">Batch name:</label>
                    <input
                        type="text"
                        className="input-group"
                        id="BatchaName"
                        placeholder="Enter Batch title"
                        value={batchName}
                        required
                        onChange={(e) => setBatchName(e.target.value)}
                    />
                </div>
               
                <div className="mb-3 input-group">
                    <label htmlFor="batchCount" className="form-label">Batch Count :</label>
                    <input
                        type="text"
                        className="input-group"
                        id="BatchCount"
                        placeholder="Enter batch title"
                        value={batchCount}
                        required
                        onChange={(e) => setBatchCount(e.target.value)}
                    />
                </div>
                <div className='btn-right-align'>
                    <button type="submit" className="btn btn-bd-primary">Add Batch</button>
                </div>
            </form>
            </div>
        </div>
    );
}
