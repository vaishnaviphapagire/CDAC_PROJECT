import { useEffect } from "react";
import { Card, Col } from "react-bootstrap";

export function ViewQuestion({ props, index }) {
  const { question, opt1, opt2, opt3, opt4, correctAns } = props;

  // This effect highlights the correct answer when the component mounts
  useEffect(() => {
    // Add any logic you need to execute when the component mounts here
  }, [correctAns]);

  // This function returns the styles based on whether the option is correct or not
  const getOptionStyle = (optionNumber) => {
    if (optionNumber === correctAns) {
      return { color: "#40a933", fontWeight: "bold" };
    }
    return {};
  };

  return (
    <Col md={12} key={index} className="mb-4">
      <Card className="question-card">
        <Card.Body>
          <Card.Title>
            <pre style={{fontFamily:'Verdana, Geneva, Tahoma, sans-serif'}}>Q{index + 1} : {question}</pre>
          </Card.Title>
          <Card.Text>
            <br />
            <strong>Options:</strong>
            <ul>
              <li style={getOptionStyle(1)} className="list-item">
                <pre>{opt1}</pre>
              </li>
              <li style={getOptionStyle(2)} className="list-item">
                <pre>{opt2}</pre>
              </li>
              <li style={getOptionStyle(3)} className="list-item">
                <pre>{opt3}</pre>
              </li>
              <li style={getOptionStyle(4)} className="list-item">
                <pre>{opt4}</pre>
              </li>
            </ul>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}
