// import { useNavigate } from 'react-router-dom';
// import { Card, Container, Row, Col } from 'react-bootstrap';
// import { getAllQuiz } from '../Services/quiz';
// import { useState, useEffect } from 'react';

// export default function AllQuizes() {
//   const navigate = useNavigate();
//   const [quizes, setQuizes] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getQuizes = async () => {
//       try {
//         const result = await getAllQuiz();
//         // const { title, quizTime, quizMarks, passingMarks, subject , status ,batch,quizScheduleDate,quizScheduleTime} = result;

//         setQuizes(result);
//         console.log(result);
//       } catch (error) {
//         setError('Failed to fetch quizzes. Please try again later.');
//         console.error('Error fetching quizzes:', error);
//       }
//     };

//     getQuizes();
//   }, []);

//   return (
//     <div className="row ms-2">
//       <h2 className='heading'>All Quizzes</h2>
//       <Container>
//         {error && <p className="text-danger">{error}</p>}
//         <Row className='mt-4'>
//           {quizes.length === 0 ? (
//             <p>No quizzes available.</p>
//           ) : (
//             <Col md={4} key={index} className="mb-4">
//               <Card className="exam-card  mb-4 ms-2" >
//                 <Card.Body>
//                   <Card.Title><h4>{quiz.title}</h4></Card.Title>
//                   <hr />
//                   <Card.Text>
//                     <strong>Subject: </strong> {quiz.subject.subName}<br />
//                     <strong>Quiz time : </strong> {quiz.quizTime}<br />
//                     <strong>Scheduled Date: </strong> {new Date(quiz.quizScheduleDate).toLocaleDateString()}<br />
//                     <strong>Scheduled Time: </strong> {new Date(quiz.quizScheduleTime).toLocaleTimeString()}<br />
//                     <strong>Quiz Marks : </strong> {quiz.quizMarks}<br />
//                     <strong>Passing Marks : </strong> {quiz.passingMarks}<br />
//                   </Card.Text>
//                   {/* <Button className="btn btn-bd-primary" onClick={viewQuestions(quiz.id)}>
//                   View Questions
//                 </Button>  */}
//                   {/* <Link className="btn btn-bd-primary me-2" to="/ViewQuizQuestion/:quizId">View Questions</Link> */}
//                 </Card.Body>
//               </Card>
//             </Col>
        
//           )}
//         </Row>
//       </Container>
//     </div>
//   );
// }


import { useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { getAllQuiz } from '../Services/quiz';
import { useState, useEffect } from 'react';

export default function AllQuizes() {
  const navigate = useNavigate();
  const [quizes, setQuizes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getQuizes = async () => {
      try {
        const result = await getAllQuiz();
        setQuizes(result);
        console.log(result);
      } catch (error) {
        setError('Failed to fetch quizzes. Please try again later.');
        console.error('Error fetching quizzes:', error);
      }
    };

    getQuizes();
  }, []);

  return (
    <div className="row ms-2">
      <h2 className='heading'>All Quizzes</h2>
      <Container>
        {error && <p className="text-danger">{error}</p>}
        <Row className='mt-4'>
          {quizes.length === 0 ? (
            <p>No quizzes available.</p>
          ) : (
            quizes.map((quiz, index) => (
              <Col md={4} key={quiz.id || index} className="mb-4">
                <Card className="exam-card mb-4 ms-2">
                  <Card.Body>
                    <Card.Title><h4>{quiz.title}</h4></Card.Title>
                    <hr />
                    <Card.Text>
                      <strong>Subject: </strong> {quiz.subject.subName}<br />
                      <strong>Quiz time: </strong> {quiz.quizTime}<br />
                      <strong>Scheduled Date: </strong> {new Date(quiz.quizScheduleDate).toLocaleDateString()}<br />
                      <strong>Scheduled Time: </strong> {quiz.quizScheduleTime}<br />
                      <strong>Quiz Marks: </strong> {quiz.quizMarks}<br />
                      <strong>Passing Marks: </strong> {quiz.passingMarks}<br />
                    </Card.Text>
                    {/* Uncomment and implement this button if needed */}
                    {/* <Button className="btn btn-bd-primary" onClick={() => navigate(`/ViewQuizQuestion/${quiz.id}`)}>
                      View Questions
                    </Button> */}
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </div>
  );
}
