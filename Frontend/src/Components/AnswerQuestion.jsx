import { Card, Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useCallback } from 'react';

export function AnswerQuestion({ props, index, onAnswerChange }) {
    const { id, question, opt1, opt2, opt3, opt4, correctAns } = props
    const [selectedOption, setSelectedOption] = useState(0);

    // Handle option selection
    const onOptionChange = useCallback((e) => {
        const selectedValue = parseInt(e); // Convert value to integer
        setSelectedOption(selectedValue);
        onAnswerChange(id, selectedValue); // Notify the parent component
    }, [onAnswerChange, id]);

    useEffect(() => {
        setSelectedOption(0)
    }, [])

    

    return (
        <Col md={12} key={index} className="mb-4">
            <Card className="question-card shadow">
                <Card.Body>
                    <h6> Q{index + 1}. {question}</h6>
                    <Card.Text>
                        <strong><h6>Options:</h6></strong>
                        <div className='radio-btn' >
                            <input className='me-2' type='radio' value='1' name={id}
                                onChange={() => onOptionChange(1)} ></input>{opt1}
                        </div>
                        <div className='radio-btn'>
                            <input className='me-2' type='radio' value='2' name={id}
                                onChange={() => onOptionChange(2)} ></input>{opt2}
                        </div>
                        <div className='radio-btn'>
                            <input className='me-2' type='radio' value='3' name={id}
                                onChange={() => onOptionChange(3)} ></input>{opt3}
                        </div>
                        <div className='radio-btn'>
                            <input className='me-2' type='radio' value='4' name={id}
                                onChange={() => onOptionChange(4)} ></input>{opt4}
                        </div>
                        <input type='hidden' value={correctAns} name={id} ></input>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )


}