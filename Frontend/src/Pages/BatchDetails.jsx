import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaUsersViewfinder } from "react-icons/fa6";
import { MdOutlinePreview } from "react-icons/md";
import { getAllBatches } from '../Services/batch';
import {getStudentListByBatch} from '../Services/batch'
export default function BatchDetails() {

    const navigate = useNavigate();
    const [batches,setBatches]=useState([])
    const getBatches = async () => {
        try {
            const result = await getAllBatches();
            setBatches(result); // Ensure result is an array
        } catch (error) {
            console.error('Error fetching subject data:', error);
        }
    };
    const handleEdit = (id) => {
        // Edit logic here
        console.log(`Edit batch with id: ${id}`);
    };

    const handleDelete = (id) => {
        // Delete logic here
        console.log(`Delete batch with id: ${id}`);
    };

    const handleStudentList = (id) => {
        // View student list logic here
        console.log(`View student list for batch with id: ${id}`);
        navigate(`/BatchStudents/${id}`)
    };
    useEffect(()=>{
        getBatches();
    },[]);

    return (
        <div className="container-fluid">
            <h2 className="heading ms-2">Batch Details</h2>
            <div className="table-responsive mt-3">

                <Container>
                    <table className="table table-bordered table-hover custom-table shadow">
                        <thead className="table-heading">
                            <tr>
                                <th scope="col">ID</th>
                                {/* <th scope="col">Created On</th> */}
                                <th scope="col">Batch Name</th>
                                <th scope="col">Batch Count</th>
                                <th scope="col"><center>Actions</center></th>
                            </tr>
                        </thead>
                        <tbody>
                            {batches.map((batch) => (
                                <tr key={batch.id}>
                                    <td>{batch.id}</td>
                                    {/* <td>{batch.createdOn}</td> */}
                                    <td>{batch.batchName}</td>
                                    <td>{batch.batchCount}</td>
                                    <td>
                                        <center>
                                            {/* <button
                                                className="btn btn-light"
                                                onClick={() => handleEdit(batch.id)}
                                            >
                                                <MdEdit></MdEdit> Edit
                                            </button>
                                            <button
                                                className="btn btn-light ms-5"
                                                onClick={() => handleDelete(batch.id)}
                                            >
                                                <MdDelete></MdDelete> Delete
                                            </button> */}
                                            <button
                                                className="btn btn-light ms-5"
                                                onClick={() => handleStudentList(batch.id)}
                                            >
                                                <MdOutlinePreview></MdOutlinePreview> Student List
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
