import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { getSubjects } from '../Services/subject';

export default function ViewSubject() {
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState([]); // Initialize as an array

    const getAllSubjects = async () => {
        try {
            const result = await getSubjects();
            setSubjects(result); // Ensure result is an array
        } catch (error) {
            console.error('Error fetching subject data:', error);
        }
    };

    const handleDelete = (id) => {
        // Delete logic here
        console.log(`Delete subject with id: ${id}`);
    };

    useEffect(() => {
        getAllSubjects();
    }, []); // Run only once on component mount

    return (
        <div className="container-fluid">
            <h2 className="heading ms-2 mt-4">Subject List</h2>
            <div className="table-responsive">
                <Container>
                    <table className="table table-bordered table-hover custom-table shadow">
                        <thead className="table-heading">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Subject Name</th>
                                <th scope="col" className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.map((subject) => (
                                <tr key={subject.subId}>
                                    <td>{subject.subId}</td>
                                    <td>{subject.subName}</td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-light ms-2"
                                            onClick={() => handleDelete(subject.subId)}
                                        >
                                            <MdDelete /> Delete
                                        </button>
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
