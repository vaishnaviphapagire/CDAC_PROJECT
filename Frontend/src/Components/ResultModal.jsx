import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { ViewQuestion } from './ViewQuestion';
export function ResultModal({ isOpen,
    onClose,
    quiz,
    markedOptions,
    questions,
    result }) {

    const reviewQuestions = () => {
        return (
            questions.map((quest, index) => {

                const getOptionStyle = (optionNumber) => {
                    if (optionNumber === quest.correctAns) {
                        return { color: 'green', fontWeight: 'bold' }; // Correct option
                    }
                    if (optionNumber === markedAnswer) {
                        return { color: 'red' }; // Incorrect option selected by the user
                    }
                    return {}; // Default style for unselected, incorrect options
                };

                let markedAnswer = markedOptions.get(quest.id);
                if (markedAnswer === null || markedAnswer === undefined)
                    markedAnswer = 0;
                // if question is not attempted it returns null or undefined then set bydefault 0
                return <div className='exam-card mb-3' style={{ padding: '20px' }}>
                    <div key={quest.id} style={{ marginBottom: '1rem' }}>
                        <p><strong>Question {index + 1}:</strong>{quest.question}</p>
                        <ul>
                            <li className="list-item" id={index + 1 + '1'} style={getOptionStyle(1)}>
                                {quest.opt1}
                            </li>
                            <li className="list-item" id={index + 1 + '2'} style={getOptionStyle(2)}>
                                {quest.opt2}
                            </li>
                            <li className="list-item" id={index + 1 + '3'} style={getOptionStyle(3)}>
                                {quest.opt3}
                            </li>
                            <li className="list-item" id={index + 1 + '4'} style={getOptionStyle(4)}>
                                {quest.opt4}
                            </li>

                        </ul>
                    </div>
                </div>
            })
        )
    }

    return (
        <Modal show={isOpen} onClose={onClose}>
            <Modal.Header>
                <Modal.Title className='heading'>Your Quiz Marks</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>{quiz.title}</strong> </p>
                <div className='attemp-quiz-card' style={{ fontSize: 'small' }} >
                    <p><strong>Passing Marks:</strong> {quiz.passingMarks}</p>
                    <p><strong>Obtained Marks:</strong> {result.obtainedMarks}/{quiz.quizMarks}</p>
                </div>
                <div className="container-fluid row mt-2 ms-2">
                    <div className="card shadow exam-card col-md-4 mb-3 me-2">
                        <div className="card-body">
                            <h5 className="card-title" style={{ fontSize: 'small' }}> Obtained Marks </h5>
                            <p className="card-text">{result.obtainedMarks}</p>
                        </div>
                    </div>
                    <div className="card shadow exam-card col-md-4 mb-3 me-2">
                        <div className="card-body">
                            <h5 className="card-title" style={{ fontSize: 'small' }}> Attempted</h5>
                            <p className="card-text">{result.attemptedQue}</p>
                        </div>
                    </div>
                    <div className="card shadow exam-card col-md-4 mb-3 me-2">
                        <div className="card-body">
                            <h5 className="card-title" style={{ fontSize: 'small' }}> Not Attempted  </h5>
                            <p className="card-text">{result.notAttempted}</p>
                        </div>
                    </div>
                    <div className="card shadow exam-card col-md-4 mb-3 me-2">
                        <div className="card-body">
                            <h5 className="card-title" style={{ fontSize: 'small' }}> Correct Answers  </h5>
                            <p className="card-text">{result.correctQue}</p>
                        </div>
                    </div>
                    <div className="card shadow exam-card col-md-4 mb-3 me-2">
                        <div className="card-body">
                            <h5 className="card-title" style={{ fontSize: 'small' }}> Wrong Answers  </h5>
                            <p className="card-text">{result.wrongQue}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h6 className='heading'>Marked Answers</h6>
                    <hr />
                    {
                        reviewQuestions()
                    }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>OK</Button>
            </Modal.Footer>
        </Modal>

    )
}
