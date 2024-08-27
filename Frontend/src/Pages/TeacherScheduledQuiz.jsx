import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getAllSheduledQuiz } from '../Services/quiz';

const TeacherScheduledQuiz = () => {

  const user = useSelector((state) => state.user);
  const navigate = useNavigate()

  useEffect(() => {
    getQuizes()
  }, [])

  const getQuizes = async () => {
    try {
      const result = await getAllSheduledQuiz()
      console.log(result)
      setQuizez(result)
    } catch (error) {
    }
  }

  const [quizzes, setQuizez] = useState([])
  const [scheduledQuiz, setScheduledQuiz] = useState([])
  const [showQuiz, setshowQuiz] = useState({});

  useEffect(() => {
    const twoHoursInMilliseconds = 2 * 60 * 60 * 1000;
    const checkTime = () => {
      const currentTime = new Date();
      setScheduledQuiz(quizzes.filter(quiz => {
        const scheduledTime = new Date(`${quiz.quizScheduleDate}T${quiz.quizScheduleTime}`);
        const endTime = new Date(scheduledTime.getTime() + twoHoursInMilliseconds);
        return endTime >= scheduledTime
      }))
    };
    checkTime();
    const interval = setInterval(checkTime, 1000 * 60); // Check every minute
    return () => clearInterval(interval);
  }, [quizzes]);


  const deleteExam = (id) => {
    console.log(`Deleting quiz ID: ${id}`);// have to authorise
  };

  return (

    <div className="row ms-2">
      <h2 className="heading">Scheduled Quiz</h2>
      <Container>
        <Row className='mt-3'>
          {scheduledQuiz.map((quiz, index) => (

            <Col md={4} key={index} className="mb-2">
              <Card className="exam-card mb-2 ms-2">
                <Card.Body>
                  <Card.Title><h5><strong>{quiz.title}</strong></h5></Card.Title>
                  <hr />
                  <Card.Text>
                    <strong>Subject: </strong> {quiz.subject.subName}<br />
                    <strong>Quiz time : </strong> {quiz.quizTime} minutes<br />
                    <strong>Scheduled Date: </strong> {new Date(quiz.quizScheduleDate).toLocaleDateString()}<br />
                    <strong>Scheduled Time: </strong> {quiz.quizScheduleTime}<br />
                    <strong>Quiz Marks : </strong> {quiz.quizMarks}<br />
                    <strong>Passing Marks : </strong> {quiz.passingMarks}<br />
                  </Card.Text>
                  <div className='d-flex'>
                    <div>
                      <Link className="btn btn-bd-primary me-2" to={`/viewQuizQuestion/${quiz.id}`}>View Questions</Link>
                      {/* <Button className='btn-light update' onClick={() => deleteExam(quiz.id)}><RiDeleteBin6Line /></Button> */}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default TeacherScheduledQuiz;

