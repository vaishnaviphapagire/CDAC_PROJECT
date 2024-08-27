
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { MdDelete } from "react-icons/md";
import { deleteTeacher, getAllTeachers } from '../Services/teacher';

export default function TeacherDetails() {
    const [teachers, setTeachers] = useState([]);

    // Function to fetch all teachers from the API
    const getTeachers = async () => {
        try {
            const result = await getAllTeachers();
            setTeachers(result);
        } catch (error) {
            console.error('Error fetching teacher data:', error);
        }
    };

    
    const handleDelete = async (id) => {
        try {
        const result = await deleteTeacher(id);
        setTeachers(teachers.filter(teacher => teacher.id !== id));
        console.log(`Deleted teacher with id: ${id}`);
        } catch (error) {
            console.error('Error deleting teacher:', error);
         }
    };

    useEffect(() => {
        getTeachers();
       
    }, []);

    return (
        <div className="container-fluid">
            <h2 className="heading ms-2">Teacher Details</h2>
            <div className="table-responsive mt-4">
                <Container>
                    <table className="table table-bordered table-hover custom-table shadow">
                        <thead className="table-heading">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Designation</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Subjects</th>
                                <th scope="col"><center>Actions</center></th>
                            </tr>
                        </thead>
                        <tbody>
                        
                            {teachers.map((teacher,index) => (
                                <tr key={teacher.id}>
                                    <td>{index+1}</td>
                                    <td>{teacher.designation}</td>
                                    <td>{teacher.name}</td>
                                    <td>{teacher.email}</td>
                                    <td>{teacher.phone}</td>
                                    <td>{teacher.subjects.map(subject => subject.subName).join(', ')}</td>
                                    <td>
                                        <center>
                                            <button
                                                className="btn btn-light ms-5"
                                                onClick={() => handleDelete(teacher.id)}
                                            >
                                                <MdDelete /> Delete
                                            </button>
                                        </center>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Container>
            </div>
        </div>
    );
}
