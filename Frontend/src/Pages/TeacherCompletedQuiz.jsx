import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllCompletedQuiz } from '../Services/quiz';


export function TeacherCompletedQuiz() {
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    const [quizes, setQuizez] = useState([])


    const getQuizes = async () => {
        try {
            const result = await getAllCompletedQuiz()
            setQuizez(result)
        } catch (error) {
        }
    }

    useEffect(() => {
        getQuizes()
    }, [])

    const viewQuestions = (quizId) => {
        console.log(`Viewing questions for exam ID: ${quizId}`);
        navigate(`/viewQuizQuestion/${quizId}`)
    };

    return (
        <div className="conatiner-fluid row ms-2">
            <h2 className='heading'>Completed Quiz</h2>
            <Container >
                <Row className='mt-4'>
                    {quizes.map((quiz, index) => (
                        <Col md={4} key={index} className="mb-4">
                            <Card className="exam-card  mb-4 ms-2" >
                                <Card.Body>
                                    <Card.Title><h4>{quiz.title}</h4></Card.Title>
                                    <hr />
                                    <Card.Text>
                                        <strong>Subject: </strong> {quiz.subject.subName}<br />
                                        <strong>Quiz time : </strong> {quiz.quizTime}<br />
                                        <strong>Scheduled Date: </strong> {new Date(quiz.quizScheduleDate).toLocaleDateString()}<br />
                                        <strong>Scheduled Time: </strong> {quiz.quizScheduleTime}<br />
                                        <strong>Quiz Marks : </strong> {quiz.quizMarks}<br />
                                        <strong>Passing Marks : </strong> {quiz.passingMarks}<br />
                                    </Card.Text>
                                    <Button className="btn btn-bd-primary" onClick={() => viewQuestions(quiz.id)}>
                                        View Questions
                                    </Button>
                                    {/* <Link className="btn btn-bd-primary me-2" to="/ViewQuizQuestion/:quizId">View Questions</Link> */}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>


    );
};

