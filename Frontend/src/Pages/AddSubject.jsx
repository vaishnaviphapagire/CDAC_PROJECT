import React, { useState } from 'react';
import { addSubject } from '../Services/subject';

export default function AddSubject() {
    const [subjectName, setSubjectName] = useState('');
   


    const handleSubject = async (e) => {
        e.preventDefault(); // Prevent form submission refresh
    
        try {
            // Call the addSubject function with the subjectName
            await addSubject(subjectName);
    
            console.log("New Subject Added"); // Log the new event
    
            setSubjectName(''); // Clear the subject name
    
            alert('Subject Added');
        } catch (error) {
            console.error("Error adding subject:", error);
            alert('Failed to add subject');
        }
    };
    

    return (
        <div className="container-fluid">
            <h2 className="heading">Add Subject</h2>
            <div className='container'>
                <form onSubmit={handleSubject}>
                    <div className="mb-3 input-group">
                        <label htmlFor="SubjectName" className="form-label">Subject Name:</label>
                        <input
                            type="text"
                            className="input-group"
                            id="SubjectName"
                            placeholder="Enter Subject name"
                            value={subjectName}
                            required
                            onChange={(e) => setSubjectName(e.target.value)}
                        />
                    </div>
                    <div className='btn-right-align'>
                        <button type="submit" className="btn btn-bd-primary" >Add Subject</button>
                    </div>
                </form>

            </div>
        </div>
    );
}
