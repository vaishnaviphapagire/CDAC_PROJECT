import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const QuizDetails = () => {
  const { quizId } = useParams();

  const questions = [
    {
      question: "What is 2+2?",
      options: ["3", "4", "5", "6"],
      correctAnswer: "4"
    },
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctAnswer: "Paris"
    },
    {
      question: "What is the square root of 9?",
      options: ["2", "3", "4", "5"],
      correctAnswer: "3"
    },
    // Add more questions as needed
  ];

  return (
    <Container className="quiz-details mt-5">
      <h2 className='heading'>Quiz Questions</h2>
      <Row>
        {questions.map((question, index) => (
          <Col md={6} key={index} className="mb-4">
            <Card className="question-card">
              <Card.Body>
                <Card.Title>Question {index + 1}</Card.Title>
                <Card.Text>
                  {question.question}
                  <br />
                  <strong>Options:</strong>
                  <ul>
                    {question.options.map((option, i) => (
                      <li key={i}>{option}</li>
                    ))}
                  </ul>
                  <strong>Correct Answer:</strong> {question.correctAnswer}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default QuizDetails;
