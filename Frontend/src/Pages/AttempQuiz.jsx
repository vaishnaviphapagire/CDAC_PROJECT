import { useEffect, useState } from "react";
import { json, useNavigate, useParams } from "react-router-dom";
import { AnswerQuestion } from "../Components/AnswerQuestion";
import { ResultModal } from "../Components/ResultModal";
import { useSelector } from "react-redux";
import { getQuizById } from "../Services/quiz";
import { getQuestions } from "../Services/question";
import { addResult } from "../Services/result";
import { useLocation } from "react-router-dom";

export function AttempQuiz() {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    // const  quiz  = JSON.parse(params.get('quiz'));
    // const questions = JSON.parse(params.get('quizQuestions'));
    const [quiz, setQuiz] = useState({
        id: null,
        title: '',
        quizTime: '',
        quizMarks: 0,
        passingMarks: 0,
        subName: ''
    })
    const quizId = params.get('quizId');
    const [title, setTitle] = useState('');
    const [quizTime, setQuizTime] = useState('');
    const [quizMarks, setQuizMarks] = useState('');
    const [passingMarks, setPassingMarks] = useState('');
    const [subName, setSubName] = useState('')

    const quizQuestionsString = params.get('quizQuestions');

    const questions = quizQuestionsString ? JSON.parse(decodeURIComponent(quizQuestionsString)) : [];

    console.log('Quiz Id:', quizId);
    console.log('Quiz Questions:', questions);

    const getQuiz = async () => {
        const result = await getQuizById(quizId)
        const { id, title, quizMarks, passingMarks, quizTime } = result
        setQuiz({
            id: id,
            title: title,
            quizTime: quizTime,
            quizMarks: quizMarks,
            passingMarks: passingMarks,
            subName: result.subject.subName
        })
    }

    useEffect(() => {
        getQuiz()
    }, [])

    const [markedOptions, setMarkedOptions] = useState(new Map());
    const [showModal, setShowModal] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(0);
    // const [obtainedMarks, setObtainedMarks] = useState(0);
    const [result, setResult] = useState({})
    const navigate = useNavigate()
    const [submitted, setSubmitted] = useState(false)
    // get studId from userDetails stored in redu
    const user = useSelector((state) => state.user);
    const studId = user.loginId;


    useEffect(() => {
        // Set initial time when quiz changes
        if (quiz?.quizTime) {
            const initialTimeInMinutes = parseInt(quiz.quizTime);
            setTimeRemaining(initialTimeInMinutes * 60);
        }
    }, [quiz]);


    useEffect(() => {
        // Timer logic
        if (timeRemaining < 0) {
            if (!submitted) {
                alert("Time is UP!!!");
                onSubmit();
            }
            return; // Do nothing if time is up
        }

        const timer = setInterval(() => {
            setTimeRemaining(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timer); // Clear interval when time reaches 0
                    if (!submitted) {
                        alert("Time is UP!!!");
                        onSubmit();
                    }
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        // Cleanup interval on component unmount or when timer stops
        return () => clearInterval(timer);
    }, [timeRemaining, submitted]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };
    const onSubmit = async () => {

        if (submitted === false) {
            setSubmitted(true)
            alert('Submitting your quiz.');
            const sqId = { quizId, studId }

            // send this body to generate result
            const markedObject = Object.fromEntries(markedOptions.entries()) //convert it into Object
            const result = await addResult(sqId, markedObject)
            console.log("result" + result)
            setResult({
                obtainedMarks: result.obtainedMarks,
                correctQue: result.correctQue,
                attemptedQue: result.attemptedQue,
                wrongQue: result.wrongQue,
                totalQue: result.totalQue,
                notAttempted: result.notAttempted,
            })

            console.log(markedOptions)
            setShowModal(true);
        }
    };

    const answerChange = (id, selectedValue) => {
        setMarkedOptions(prevAnswers => new Map(prevAnswers).set(id, selectedValue));
    };
    console.log('Submitted Answers:', Array.from(markedOptions.entries()));

    const closeModal = () => {
        setShowModal(false);
        navigate('/CompletedQuiz'); // Navigate back to the home page
    };
    const timeRemains = (t) => {
        if (t <= 60)
            return { color: 'red' }
        else if (t <= 180) {
            return { color: 'rgb(255, 115, 1)' }
        } else
            return {}
    }

    useEffect(() => {

        const handleVisibilityChange = () => { // if currernt document visibility is hidden alert msg is generated
            if (document.hidden) {
                alert('You are being monitored ! do not switch tabs');
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Prevent copy-paste actions
        const preventCopyPaste = (e) => {
            e.preventDefault();
            alert('Copying, cutting, and pasting are disabled during the quiz.');
        };
        document.addEventListener('copy', preventCopyPaste);
        document.addEventListener('cut', preventCopyPaste);
        document.addEventListener('paste', preventCopyPaste);

        //To disable right-click
        const disableRightClick = (e) => {
            e.preventDefault();
        };
        document.addEventListener('contextmenu', disableRightClick);


        return () => { // on navigating to another page all the events are removed
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            document.removeEventListener('copy', preventCopyPaste);
            document.removeEventListener('cut', preventCopyPaste);
            document.removeEventListener('paste', preventCopyPaste);
            document.removeEventListener('contextmenu', disableRightClick);
        };
    }, []);

    return (

        <div className='container-fluid row ms-2 mb-5'>
            <h4 className="heading">{quiz.title}</h4>
            <form>
                <div className="attemp-quiz-card mt-3" >
                    <div>
                        <strong>Subject : </strong> {quiz.subName}
                    </div>
                    <div>
                        <strong>Total Marks : </strong> {quiz.quizMarks}
                    </div>
                    <div>
                        <strong>Passing Marks : </strong> {quiz.passingMarks}
                    </div>
                    <div>
                        <strong>Time Remaining : </strong> <span style={timeRemains(timeRemaining)}> {formatTime(timeRemaining)}</span>

                    </div>
                </div>
                <hr />
                <div>
                    {
                        questions.map((quest, index) => {
                            return <div>
                                <AnswerQuestion props={quest} index={index} onAnswerChange={answerChange}></AnswerQuestion>
                            </div>
                        })
                    }
                    <button type='button' className="btn btn-bd-primary" onClick={onSubmit}>Submit</button>

                    <ResultModal id="exampleModal"
                        isOpen={showModal}
                        onClose={closeModal}
                        quiz={quiz}
                        markedOptions={markedOptions}
                        questions={questions}
                        result={result}
                    />
                </div>

            </form>
        </div >
    )
}

