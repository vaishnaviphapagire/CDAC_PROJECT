import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import EventBar from '../Components/EventBar';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { BsCalendarCheck } from "react-icons/bs";
import { MdQuiz } from "react-icons/md";
import { BsFileBarGraphFill } from "react-icons/bs";
import TeacherDetails from './TeacherDetails';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {

    const navigate=useNavigate();

    const getTeacherDetails=()=>{
        navigate('/TeacherDetails');
    }

    const navigateToAllQuizes=()=>{
        navigate('/AllQuizes');
    }
    const navigateToAdminScheduledQuiz=()=>{
        navigate('/AdminScheduledQuiz');
        //pass quizId here
    }

    const navigateToAdminResult=()=>{
        navigate('/AdminResult');

    }

    return (
        <div className="ms-2 col-md-12 row">
            <div className='col-md-9'>
                <Container>

                    <Row className='mt-4'>
                        <Col md={6} className="mb-4">
                            <Card className="dashboard-card">
                                <Card.Body>
                                    <Card.Title className="d-flex justify-content-between align-items-center">
                                        <span><h4>TEACHER</h4></span>
                                        <button
                                            className="btn btn-light"
                                        onClick={() => getTeacherDetails()}
                                        >
                                            <FaChalkboardTeacher />
                                        </button>
                                    </Card.Title>
                                    <hr />
                                    <Card.Text>
                                        Details about the teacher.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={6} className="mb-4">
                            <Card className="dashboard-card">
                                <Card.Body>
                                <Card.Title className="d-flex justify-content-between align-items-center">
                                    <span><h4>SCHEDULE QUIZ</h4></span>
                                    <button
                                            className="btn btn-light"
                                         onClick={navigateToAdminScheduledQuiz}//pass quizId here
                                        >
                                            <BsCalendarCheck/>
                                        </button>
                                    </Card.Title>
                                    <hr />
                                    <Card.Text>
                                        To schedule a quiz.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className='mt-4'>
                        <Col md={6} className="mb-4">
                            <Card className="dashboard-card">
                                <Card.Body>
                                <Card.Title className="d-flex justify-content-between align-items-center">
                                    <span><h4>QUIZES</h4></span>
                                    <button
                                            className="btn btn-light"
                                         onClick={() => navigateToAllQuizes()}
                                        >
                                            <MdQuiz/>
                                        </button>
                                    </Card.Title>
                                    <hr />
                                    <Card.Text>
                                        Get all the quizes.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} className="mb-4">
                            <Card className="dashboard-card">
                                <Card.Body>
                                <Card.Title className="d-flex justify-content-between align-items-center">
                                    <span><h4>RESULT</h4></span>
                                    <button
                                            className="btn btn-light"
                                         onClick={navigateToAdminResult}
                                        >
                                        <BsFileBarGraphFill />
                                        </button>
                                    </Card.Title>
                                    <hr />
                                    <Card.Text>
                                        Results and outcomes of the quiz.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className='col-md-3'>
                <EventBar />
            </div>
        </div>
    );
}

export default AdminDashboard;
