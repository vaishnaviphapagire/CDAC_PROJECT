import React, { useState, useEffect } from 'react';
import { Container, Modal } from 'react-bootstrap';
import { GrAnalytics } from "react-icons/gr";
import { useSelector } from 'react-redux';
import StudentPiechart from '../Components/StudentPieChart';
import { getQuizByStudentId, getQuizAnalysisBySqID } from '../Services/result'; // Adjust import path

export default function StudentResult() {
    const [quizzes, setQuizzes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [selectedQuizId, setSelectedQuizId] = useState(null);
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.user);
    const userId = user.loginId; // Replace with actual user ID from user slice

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const data = await getQuizByStudentId(userId); // Replace userId with actual value
                setQuizzes(data);
            } catch (error) {
                console.error('Error fetching quiz data:', error);
            }
        };

        fetchQuizzes();
    }, [userId]);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const navigateToAnalyze = async (quizId) => {
        setLoading(true);
        setSelectedQuizId(quizId);
        try {
            const studId = userId; // Use the actual student ID from user slice
            const data = await getQuizAnalysisBySqID(quizId, studId);
            setModalData(data);
            handleShow();
        } catch (error) {
            console.error('Error fetching quiz analysis data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container ">
            <h2 className="heading ms-2">Quiz Results</h2>
            <div className="table-responsive mt-3">
                <Container>
                    <table className="table table-bordered table-hover custom-table shadow">
                        <thead className="table-heading">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Title</th>
                                <th scope="col">Passing Marks</th>
                                <th scope="col">Remark</th>
                                <th scope="col"><center>Actions</center></th>
                            </tr>
                        </thead>
                        <tbody>

                            {quizzes.map((quiz, index) => (
                                <tr key={quiz.id}>
                                    <td>{index + 1}</td>
                                    <td>{quiz.title}</td>
                                    <td>{quiz.passingMarks}</td>
                                    <td style={{ color: quiz.remark === 'Pass' ? 'green' : 'red' }}>
                                        {quiz.remark}
                                    </td>
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
                                <div className="col-md-6 mb-3">
                                    <div className="card shadow exam-card">
                                        <div className="card-body">
                                            <h5 className="card-title" style={{ fontSize: 'small' }}>Total Questions</h5>
                                            <p className="card-text">{modalData.totalQue}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="card shadow exam-card">
                                        <div className="card-body">
                                            <h5 className="card-title" style={{ fontSize: 'small' }}>Obtained Marks</h5>
                                            <p className="card-text">{modalData.obtainedMarks}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col">
                                    <StudentPiechart data={{
                                        correct: modalData.correctQue,
                                        incorrect: modalData.wrongQue,
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
