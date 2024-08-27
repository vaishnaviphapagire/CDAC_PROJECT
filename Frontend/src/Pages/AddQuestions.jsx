import { useState } from "react";
import { useLocation } from "react-router-dom";
import CreateQuestion from "../Components/AddQuestion";
import { ViewQuestion } from "../Components/ViewQuestion";
import { addQuestion } from "../Services/question";
import { getQuestions } from "../Services/question";
import { useEffect } from "react";
import { Link } from "react-router-dom";


export function AddQuestions() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const quizId = parseInt(queryParams.get('quizId'))
    const questionCount = parseInt(queryParams.get('quizMarks'))
    const [formCount, setFormCount] = useState(1);
    const [inputs, setInputs] = useState([]);

    const [questions, setQuestions] = useState() // set this from the backend



    const saveQuestion = async (data) => { //save this question to backend along with quizId
        try {
            console.log("IN try catch block in parent component DATA : " + data)
            console.log(data.question + data.opt1 + data.opt2 + data.opt3 + data.opt4 + data.correctAns + data.quizId + 1)
            const result = await addQuestion(data.question, data.opt1, data.opt2, data.opt3, data.opt4, data.correctAns, data.quizId, 1)
            alert("question Added !!")
            setInputs([...inputs, data]);
            if (formCount <= questionCount) { //for allowing only limited questions option
                setFormCount(formCount + 1);
            } else {
                alert('All Questions are added');
            }
        } catch (error) {
            console.log(error)
            alert(error)
        }
    };


    const props = { quizId }

    const getAllQuestions = async () => {
        //call api to getAllQuestions
       // const result = await getQuestions(quizId)
        // setQuestions(result)
    }
    
    useEffect(() => {
        getAllQuestions()
    })

    return (
        <div>
            {
                formCount <= questionCount ?
                    <div className="ms-3 me-3">
                        <h4 className="heading">Question {formCount}</h4>
                        <div className="container-fluid mt-4">
                            <CreateQuestion props={props} onSubmit={saveQuestion} />
                        </div>
                    </div>
                    :
                    <div>
                        <center>
                            <strong>All Questions Added !!!</strong>
                            <Link className="btn update" to="/TeacherAddQuiz" >ok</Link>
                        </center>
                    </div>
            }
            <div className="ms-3 me-3">


                <h2 className="heading mt-5">Saved Questions</h2>
                <ul>
                    {
                        inputs.map((input, index) => (
                            <ViewQuestion props={input} index={index}></ViewQuestion>
                        ))
                    }
                    {/* {
                        questions.map((input, index) => (
                            <ViewQuestion props={input} index={index}></ViewQuestion>
                        ))
                    } */}
                </ul>
            </div>


        </div >

    )
}