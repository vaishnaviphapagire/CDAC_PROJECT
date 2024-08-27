import React, { useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ViewQuestion } from '../Components/ViewQuestion';
import { getQuestions } from '../Services/question'
import { useEffect } from 'react';

const ViewQuizQuestion = () => {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]) //set this when you get questions from the api

  const getAllQuestions = async () => {
    const result = await getQuestions(quizId)
    setQuestions(result)
    //call api to getAllQuestions
    // setQuestions(response.data)
  }
  useEffect(() => {
    getAllQuestions()
  }, [])

  return (
    <div className='container-fluid row ms-2'>
      <h2 className='heading'>Quiz Questions</h2>
      <Container className="quiz-details mt-3">
        <Row>
          {
            questions.map((quest, index) => {
              return <div>
                <ViewQuestion props={quest} index={index} markedAns={0}></ViewQuestion>
              </div>
            })
          }
        </Row>
      </Container>
    </div>

  );
};

export default ViewQuizQuestion;
