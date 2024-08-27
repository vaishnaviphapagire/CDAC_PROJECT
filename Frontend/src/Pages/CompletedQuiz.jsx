import { Link, useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getQuizByStudentId } from '../Services/result';
import { getBatchWiseQuiz } from '../Services/quiz';
import { useSelector } from 'react-redux';

const CompletedQuiz = () => {
  const user = useSelector((state)=> state.user)
  const navigate = useNavigate()
  const [quizes, setQuizez] = useState([])
  const [attemptedQuizes, setAttemptedQuizes] = useState([])
  const [completedQuizes, setCompletedQuizes] = useState([])

  const getQuizes = async () => {
    try {
      const result = await getBatchWiseQuiz(user.batchId)
      console.log("batchwiseQuiz : "+result)
      setQuizez(result)
      getAttemptedQuizes()
    } catch (error) {
    }
  }

  const getAttemptedQuizes = async () => {
    const result = await getQuizByStudentId(user.loginId)
    console.log("Attempted Quizes "+result)
    setAttemptedQuizes(result)
    // filtering out  attempted quizes from the attempted quizes by getting attempted quizes from result tabled 
    //on studentID so that only attempted quizes are visible
  
  }

  const getCompletedQuiz=()=>{
    setCompletedQuizes(quizes.filter(quiz =>
      attemptedQuizes.some(attempted => quiz.id === attempted.id)))
    console.log("Completed Quizes"+completedQuizes)
  }
  useEffect(()=>{
    getQuizes()
    getAttemptedQuizes()
  },[])
useEffect(()=>{
 getCompletedQuiz()
},[quizes,attemptedQuizes])

  const viewQuestions = (quizId) => {
    console.log(`Viewing questions for exam ID: ${quizId}`);
    navigate(`/viewQuizQuestion/${quizId}`)
  };

  return (
    <div className="conatiner-fluid row ms-2">
      <h2 className='heading'>Completed Quiz</h2>
      <Container >
        <Row className='mt-4'>
          {completedQuizes.map((quiz, index) => (
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
                  <Button className="btn btn-bd-primary" onClick={()=> viewQuestions(quiz.id)}>
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

export default CompletedQuiz;

