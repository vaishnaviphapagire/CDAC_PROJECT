import { Link, useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect } from 'react';
import { useState } from 'react';
import { getBatchWiseQuiz, getQuizById } from '../Services/quiz';
import { getQuestions } from '../Services/question';
import { getQuizByStudentId } from '../Services/result';
const ScheduledQuiz = () => {


  const user = useSelector((state) => state.user);
  const navigate = useNavigate()

  useEffect(() => {
    getQuizes()
    getAttemptedQuizes()
  })

  const [quizzes, setQuizez] = useState([])
  const [canAttempt, setCanAttempt] = useState({});
  const [attemptedQuizes, setAttemptedQuizes] = useState([])
  const [quizQuestions, setQuizQuestions] = useState()
  const [scheduledQuizes, setScheduledQuizes] = useState([])

  const twoHoursInMilliseconds = 2 * 60 * 60 * 1000;

  useEffect(() => {
   

   
  },[]);//[quizzes]

  const checkTime = () => {
    const currentTime = new Date();
    const canAttemptUpdates = {};
    quizzes.forEach(quiz => {
      // const scheduledTime = new Date(quiz.quizScheduleTime);
      const scheduledTime = new Date(`${quiz.quizScheduleDate}T${quiz.quizScheduleTime}`);
      const endTime = new Date(scheduledTime.getTime() + twoHoursInMilliseconds);
      // Enable the button only between the scheduled time and two hours after
      if (currentTime >= scheduledTime && currentTime <= endTime) {
        canAttemptUpdates[quiz.id] = true;
      } else {
        canAttemptUpdates[quiz.id] = false;
      }
    });
    setCanAttempt(canAttemptUpdates);
  };

useEffect(()=>{
  checkTime();
  const interval = setInterval(checkTime, 1000 * 60); // Check every minute
  return () => clearInterval(interval);
},[quizzes])

  const attempExam = async (quizId) => {
    await getQuizQuestions(quizId)
  };

  const giveQuiz = (quizId, quizQuestions) => {
    const quizIdString = (JSON.stringify(quizId));
    const quizQuestionsString = encodeURIComponent(JSON.stringify(quizQuestions));
    navigate(`/attemptExam/?quizId=${quizIdString}&quizQuestions=${quizQuestionsString}`);

  };


  const getQuizes = async () => {
    try {
      const result = await getBatchWiseQuiz(user.batchId)
      setQuizez(result)
    } catch (error) {
    }
  }

  const getAttemptedQuizes = async () => {
    const result = await getQuizByStudentId(user.loginId)
    setAttemptedQuizes(result)
    // filtering out not attempted quizes from the attempted quizes by getting attempted quizes from result tabled 
    //on studentID so that only non attempted quizes are visible
    setScheduledQuizes(quizzes.filter(quiz =>
      !attemptedQuizes.some(attempted => quiz.id === attempted.id)))
    console.log(scheduledQuizes)
  }



  const getQuizQuestions = async (quizId) => {
    //hit  the api that  getQuestionList(quizId)
    const questions = await getQuestions(quizId)
    console.log(questions)
    setQuizQuestions(questions)
    giveQuiz(quizId, questions);
  }

  const deleteExam = (id) => {
    console.log(`Deleting quiz ID: ${id}`);// have to authorise
  };

  return (
    //depending on role display different quizes for student and teacher
    <div className="row ms-2">
      <h2 className="heading">Scheduled Quiz</h2>
      {
        scheduledQuizes.length != 0 ?
          <Container>
            <Row className='mt-3'>
              {scheduledQuizes.map((quiz, index) => (

                (quiz.quizScheduleDate != null) &&
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
                          <Button disabled={!canAttempt[quiz.id]} className="btn-light btn-bd-primary me-2" style={{ border: '1px solid rgba(0, 0, 0, 0.067)' }}
                            onClick={() => attempExam(quiz.id)} >Attempt Quiz</Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container> :
          <div className='mt-3'>
            <center>
              <h4><strong>No Quizes Scheduled Yet !!!</strong></h4>
            </center>
          </div>
      }
    </div>
  );
};

export default ScheduledQuiz;

