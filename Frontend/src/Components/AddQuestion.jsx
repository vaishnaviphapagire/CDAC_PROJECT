import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateQuestion({ onSubmit, props }) {
  const navigate = useNavigate();

  const { quizId } = props;
  const [question, setQuestion] = useState('');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [opt4, setOpt4] = useState('');
  const [correctAns, setCorrectAns] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!correctAns) {
      alert("Select correct Answer");
    } else {
      const body = {
        question,
        opt1,
        opt2,
        opt3,
        opt4,
        correctAns,
        quizId
      };

      onSubmit(body);

      // Reset form fields
      setQuestion('');
      setOpt1('');
      setOpt2('');
      setOpt3('');
      setOpt4('');
      setCorrectAns('');

      // console.log(body);
    }
  };

  return (
    <div style={{ maxWidth: '100%', margin: 'auto', padding: '20px', borderRadius: '10px', backgroundColor: '#f152ff10' }}>
      {/* <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Question</h2> */}
      <form onSubmit={handleSubmit}>
        <div className='input-group' style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Question</label>
          <textarea
            className="input-group"
            id="question"
            placeholder="Enter the question"
            value={question}
            required
            onChange={(e) => setQuestion(e.target.value)}
            rows="5" // Adjust the number of visible rows
            cols="50" // Adjust the number of visible columns
            style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#e9ecef', fontFamily: 'Courier New, monospace', whiteSpace: 'pre-wrap' }}
          />
        </div>

        <div className='option-container' style={{ marginBottom: '15px' }}>
          <input
            type='radio'
            className='radio-space'
            value='1'
            name="correctAns"
            onChange={(e) => setCorrectAns(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <label className='radio-label'>
             1
            <textarea
              name="opt1"
              value={opt1}
              className='ms-3'
              onChange={(e) => setOpt1(e.target.value)}
              required
              rows="3" // Adjust the number of visible rows
              cols="50" // Adjust the number of visible columns
              style={{ display: 'block', width: '100%', padding: '10px', fontSize: '16px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#e9ecef', fontFamily: 'Courier New, monospace', whiteSpace: 'pre-wrap' }}
            />
          </label>
        </div>

        <div className='option-container' style={{ marginBottom: '15px' }}>
          <input
            type='radio'
            value='2'
            name="correctAns"
            onChange={(e) => setCorrectAns(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <label className='radio-label'>
             2
            <textarea
              name="opt2"
              value={opt2}
              className='ms-3'
              onChange={(e) => setOpt2(e.target.value)}
              required
              rows="3" // Adjust the number of visible rows
              cols="50" // Adjust the number of visible columns
              style={{ display: 'block', width: '100%', padding: '10px', fontSize: '16px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#e9ecef', fontFamily: 'Courier New, monospace', whiteSpace: 'pre-wrap' }}
            />
          </label>
        </div>

        <div className='option-container' style={{ marginBottom: '15px' }}>
          <input
            type='radio'
            value='3'
            name="correctAns"
            onChange={(e) => setCorrectAns(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <label className='radio-label'>
             3
            <textarea
              name="opt3"
              value={opt3}
              className='ms-3'
              onChange={(e) => setOpt3(e.target.value)}
              required
              rows="3" // Adjust the number of visible rows
              cols="50" // Adjust the number of visible columns
              style={{ display: 'block', width: '100%', padding: '10px', fontSize: '16px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#e9ecef', fontFamily: 'Courier New, monospace', whiteSpace: 'pre-wrap' }}
            />
          </label>
        </div>

        <div className='option-container' style={{ marginBottom: '15px' }}>
          <input
            type='radio'
            value='4'
            name="correctAns"
            onChange={(e) => setCorrectAns(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <label className='radio-label'>
             4 
            <textarea
              name="opt4"
              value={opt4}
              className='ms-3'
              onChange={(e) => setOpt4(e.target.value)}
              required
              rows="3" // Adjust the number of visible rows
              cols="50" // Adjust the number of visible columns
              style={{ display: 'block', width: '100%', padding: '10px', fontSize: '16px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#e9ecef', fontFamily: 'Courier New, monospace', whiteSpace: 'pre-wrap' }}
            />
          </label>
        </div>

        <div className='input-group' style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Correct Answer</label>
          <input
            type="number"
            name="correctAns"
            value={correctAns}
            required
            disabled
            style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#e9ecef' }}
          />
        </div>

        <div className='input-group' style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Quiz ID:</label>
          <input
            type="number"
            name="quizId"
            value={quizId}
            required
            disabled
            style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#e9ecef' }}
          />
        </div>

        <div style={{ textAlign: 'center' }}>
          <button className="btn btn-bd-primary" type="submit">Save Question</button>
        </div>
      </form>
    </div>
  );
}

export default CreateQuestion;
