

import React, { useState, useEffect } from 'react';
import { Container, Modal } from 'react-bootstrap';
import { GrAnalytics } from "react-icons/gr";
import Piechart from '../Components/PieChart';
import { getAllCompletedQuiz } from '../Services/quiz'; // Adjust the import path as needed
import { getStudentGraphData } from '../Services/result'; // Adjust the import path as needed

export default function AdminResult() {
    const [quizzes, setQuizzes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch quizzes on component mount
    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const data = await getAllCompletedQuiz();
                setQuizzes(data);
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            }
        };

        fetchQuizzes();
    }, []);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const navigateToAnalyze = async (id) => {
        setLoading(true);
        try {
            // Replace `123` with the actual student ID if needed
            const data = await getStudentGraphData(id); // Adjust this if you need to pass quizId
            setModalData(data);
            handleShow(); // Show the modal after data is fetched
        } catch (error) {
            console.error('Error fetching student graph data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid">
            <h2 className="heading ms-2 mt-4">Quiz Results</h2>

            <div className="table-responsive mt-4 ">

                <Container>
                    <table className="table table-bordered table-hover custom-table shadow">
                        <thead className="table-heading">
                            <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Title</th>
                                <th scope="col">Quiz Time (mins)</th>
                                <th scope="col">Quiz Marks</th>
                                <th scope="col">Passing Marks</th>
                                <th scope="col">Subject</th>
                                {/* <th scope="col">Status</th> */}
                                <th scope="col">Batches</th>
                                {/* <th scope="col">Scheduled Date</th>
                                <th scope="col">Scheduled Time</th> */}
                                <th scope="col"><center>Actions</center></th>
                            </tr>
                        </thead>
                        <tbody>
                            {quizzes.map((quiz, index) => (
                                <tr key={quiz.id}>
                                    <td>{index + 1}</td> {/* Display sequence number */}
                                    <td>{quiz.title}</td>
                                    <td>{quiz.quizTime}</td>
                                    <td>{quiz.quizMarks}</td>
                                    <td>{quiz.passingMarks}</td>
                                    <td>{quiz.subject.subName}</td>
                                    {/* <td>{quiz.status ? 'Active' : 'Inactive'}</td> */}
                                    <td>{quiz.batch.map(b => b.batchName).join(', ')}</td>
                                    {/* <td>{quiz.quizScheduleDate ? new Date(quiz.quizScheduleDate).toLocaleDateString() : 'Not Scheduled'}</td>
                                    <td>{quiz.quizScheduleTime ? new Date(quiz.quizScheduleTime).toLocaleTimeString() : 'Not Scheduled'}</td> */}
                                    <td>
                                        <center>
                                            <button
                                                className="btn btn-light"
                                                onClick={() => navigateToAnalyze(quiz.id)}
                                                disabled={loading}
                                            >
                                                <GrAnalytics /> Analyze
                                            </button>
                                        </center>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Container>
            </div>

            {/* Modal Component */}
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title className='heading'>Quiz Analysis</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading ? (
                        <p>Loading...</p>
                    ) : modalData ? (
                        <div className="container-fluid mt-3 ms-2">
                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <div className="card shadow exam-card">
                                        <div className="card-body">
                                            <h5 className="card-title" style={{ fontSize: `small` }}>Attempted</h5>
                                            <p className="card-text">{modalData.attemptedCount}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="card shadow exam-card">
                                        <div className="card-body">
                                            <h6 className="card-title" style={{ fontSize: `small` }}>Not Attempted</h6>
                                            <p className="card-text">{modalData.notAttempted}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="card shadow exam-card">
                                        <div className="card-body">
                                            <h5 className="card-title" style={{ fontSize: `small` }}>Average Score</h5>
                                            <p className="card-text">{modalData.avgMarks.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col">
                                    <Piechart data={{
                                        pass: modalData.passedCount,
                                        fail: modalData.failedCount,
                                        notAttempted: modalData.notAttempted
                                    }} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>No data available</p>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
}
