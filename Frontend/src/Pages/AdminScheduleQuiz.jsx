import React, { useState, useEffect } from 'react';
import { Container, Modal, Button, Form } from 'react-bootstrap';
import { RiCalendarScheduleFill } from 'react-icons/ri';
import { getAllSheduledQuiz, scheduleQuiz } from '../Services/quiz';

export default function AdminScheduledQuiz() {
    const [scheduledQuizes, setScheduledQuizes] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState(0); // State for the selected quiz ID
    const [modalDate, setModalDate] = useState('');
    const [modalTime, setModalTime] = useState('');

    useEffect(() => {
        const fetchScheduledQuizes = async () => {
            try {
                const result = await getAllSheduledQuiz();
                if (Array.isArray(result)) {
                    setScheduledQuizes(result);
                } else {
                    setError('Unexpected response format');
                }
            } catch (error) {
                setError('Failed to fetch quizzes. Please try again later.');
                console.error('Error fetching quizzes:', error);
            }
        };

        fetchScheduledQuizes();
    }, []);

    const handleClose = () => {
        setShowModal(false);
        setId(null); // Reset ID when closing the modal
        setModalDate('');
        setModalTime('');
    };

    const handleShow = (quizId) => {
        setId(quizId);
        setShowModal(true);
    };

    const onScheduleQuiz = async () => {
        try {
            const scheduleData = {
                quizScheduleDate: modalDate,
                quizScheduleTime: modalTime
            };
    
            console.log("Sending data:", scheduleData);
    
            await scheduleQuiz(id, scheduleData); // Send the ID and scheduleData to the backend
    
            console.log('Scheduled Quiz with Date:', modalDate, 'and Time:', modalTime);
            alert("Quiz scheduled successfully");
            handleClose();
    
            // Refresh the quiz list after scheduling
            const updatedQuizzes = await getAllSheduledQuiz();
            setScheduledQuizes(updatedQuizzes);
        } catch (error) {
            console.error('Error scheduling quiz:', error);
            alert("Failed to schedule quiz. Please try again later.");
        }
    };

    return (
        <div className="container-fluid">
            <h2 className="heading ms-2">Quiz Results</h2>
            <div className="table-responsive mt-4">
                <Container>
                    <table className="table table-bordered table-hover custom-table shadow">
                        <thead className="table-heading">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Title</th>
                                <th scope="col">Quiz Time (mins)</th>
                                <th scope="col">Quiz Marks</th>
                                <th scope="col">Passing Marks</th>
                                <th scope="col">Subject</th>
                                <th scope="col">Status</th>
                                <th scope="col">Scheduled Date</th>
                                <th scope="col">Scheduled Time</th>
                                <th scope="col"><center>Actions</center></th>
                            </tr>
                        </thead>
                        <tbody>
                            {scheduledQuizes.map((quiz, index) => (
                                <tr key={quiz.id}>
                                    <td>{index + 1}</td>
                                    <td>{quiz.title}</td>
                                    <td>{quiz.quizTime}</td>
                                    <td>{quiz.quizMarks}</td>
                                    <td>{quiz.passingMarks}</td>
                                    <td>{quiz.subject.subName}</td>
                                    <td>{quiz.status ? 'Active' : 'Inactive'}</td>
                                    <td>{quiz.quizScheduleDate}</td>
                                    <td>{quiz.quizScheduleTime}</td>
                                    <td>
                                        <center>
                                            <button
                                                className="btn btn-light"
                                                onClick={() => handleShow(quiz.id)} // Correctly pass quiz ID
                                            >
                                                <RiCalendarScheduleFill /> Schedule
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
                    <Modal.Title>Schedule Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={modalDate}
                                onChange={(e) => setModalDate(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Time</Form.Label>
                            <Form.Control
                                type="time"
                                value={modalTime}
                                onChange={(e) => setModalTime(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {/* Corrected onClick handler */}
                    <Button variant="primary" onClick={onScheduleQuiz}>
                        Schedule Quiz
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}