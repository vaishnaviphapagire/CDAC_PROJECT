import React, { useState, useEffect } from 'react';
import {getStudentListByBatch} from '../Services/batch'
import { useParams } from 'react-router-dom';

export default function BatchStudents() {
  const {id} = useParams()
  const [students, setStudents] = useState([]);

  // useEffect(() =>async()=> {

  //   // Fetch student data from backend API
  //   // fetch('/api/students')
  //   //   .then((response) => response.json())
  //   //   .then((data) => setStudents(data))
  //   //   .catch((error) => console.error('Error fetching student data:', error));
  //   const result = await getStudentListByBatch(id);
  //   setStudents(result); 

  // }, []);


  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getStudentListByBatch(id);
        setStudents(response.studentList); // Ensure this is an array
      } catch (error) {
        console.error('Error fetching students:', error);
        setStudents([]); // Fallback to empty array on error
      }
    };
  
    fetchStudents();
  }, [id]);

  return (
    <div className="container mt-5">
      <h2 className='heading'> Student List Batch </h2>
      {/* here add id of batch/name */}
      <table className="table table-bordered table-hover custom-table shadow" style={{textAlign:`center`}}>
          <thead className="table-heading">
            <tr>
              <th scope="col">Roll No</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Contact No</th>
              <th scope="col">Guardian Contact</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No students available</td>
              </tr>
            ) : (
              students.map((student, index) => (
                <tr key={index}>
                  <td>{student.rollNo}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.contactNo}</td>
                  <td>{student.guardianPhone}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
    </div>
  );
}
