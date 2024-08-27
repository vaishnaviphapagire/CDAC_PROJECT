import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAllBatches } from '../Services/batch'
import { getSubjects, getSubjectsets } from '../Services/subject'
import { addQuiz } from '../Services/quiz';

function AddQuiz() {
    //janara data into request body
    const [title, setTitle] = useState('');
    const [quizTime, setQuizTime] = useState('');
    const [quizMarks, setQuizMarks] = useState('');
    const [passingMarks, setPassingMarks] = useState('');
    const [subjectId, setSubjectId] = useState('');
    const [batchId, setBatchId] = useState([]);
    const [batches, setBatches] = useState([]);

    const [isQuestionButtonDisabled, setIsQuestionButtonDisabled] = useState(true);
    const [isQuizButtonDisabled, setIsQuizButtonDisabled] = useState(false);

    const [quizId, setQuizId] = useState() // coming into response body
    //yenara data from backend to rneder
    const [subjects, setSubjects] = useState([]);

    const navigate = useNavigate()

    const addBatch = (newItem) => {
        // Step 3: Update the Array State
        setBatchId((prevItems) => [...prevItems, newItem]);
    };
    const getBatches = async () => {

        const result = await getAllBatches();

        setBatches(result)

    }
    const getSubjectList = async () => {
        const result = await getSubjects();
        setSubjects(result)
    }

    useEffect(() => {
        getSubjectList();
        getBatches();
    }, []);



    const handleSubmit = async (event) => {
        event.preventDefault();

        if (passingMarks < 4) {
            alert("passing marks must be greater than or equal to 4")
        }
        if (quizMarks < 10) {
            alert(" quiz marks must be greater than or equal to 10")
        }
        try {
            const result = await addQuiz(title, quizTime, quizMarks, passingMarks, subjectId, batchId)
            console.log(result)
            setQuizId(result)
            alert('Quiz created !!!')
            setIsQuestionButtonDisabled(false);
            setIsQuizButtonDisabled(true);
        } catch (error) {
        }
    }

    const params = { quizId, quizMarks }
    const queryString = new URLSearchParams(params).toString();

    const addQuestion = () => {
        navigate(`/addQuestions/?${queryString}`)
    }

    // axios.post('/api/quizzes', quizData)
    //   .then(response => {
    //     alert('Quiz added successfully!');
    //   })
    //   .catch(error => {
    //     console.error('Error adding quiz:', error);
    //     alert('Failed to add quiz.');
    //   });
    //};

    return (
        <div className='container-fluid row ms-2'>
            <h2 className='heading'>Create Quiz</h2>
            <Container>
                <Form>
                    <Form.Group as={Row} className="mb-3 input-group" controlId="formTitle">
                        <Form.Label column sm={2}>Title</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 input-group" controlId="formQuizTime">
                        <Form.Label column sm={2}>Quiz Time (minutes)</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="number"
                                value={quizTime}
                                onChange={(e) => setQuizTime(e.target.value)}
                                required
                                min="1"
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 input-group" controlId="formQuizMarks">
                        <Form.Label column sm={2}>Quiz Marks</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="number"
                                value={quizMarks}
                                onChange={(e) => setQuizMarks(e.target.value)}
                                required
                                min="10"
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 input-group" controlId="formPassingMarks">
                        <Form.Label column sm={2}>Passing Marks</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="number"
                                value={passingMarks}
                                onChange={(e) => setPassingMarks(e.target.value)}
                                required
                                min="4"
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 input-group" controlId="formSubject">
                        <Form.Label column sm={2}>Subject</Form.Label>
                        <Col sm={10}>

                            <select name="" id="" required className="form-control" onChange={(e) => setSubjectId(e.target.value)} >
                                <option value="">Select Subject</option>
                                {subjects.map(subject => (
                                    <option key={subject.subId} value={subject.subId}>
                                        {subject.subName}
                                    </option>
                                ))}
                            </select>

                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 " controlId="formBatch">
                        <Form.Label column sm={2}><strong>Batches</strong></Form.Label>
                        <Col sm={10}>
                            {batches.map(batch => (
                                <Form.Check
                                    key={batch.id}
                                    type="checkbox"
                                    label={batch.batchName}
                                    value={batch.id}
                                    onChange={() => addBatch(batch.id)}
                                />
                            ))}
                        </Col>
                    </Form.Group>

                    <Button className='btn btn-bd-primary' disabled={isQuizButtonDisabled} onClick={handleSubmit}>
                        Create Quiz
                    </Button>
                    <button disabled={isQuestionButtonDisabled} className='btn btn-bd-primary ms-4' onClick={addQuestion}>
                        Add Questions
                    </button>

                </Form>
            </Container>
        </div>
    );
}

export default AddQuiz;