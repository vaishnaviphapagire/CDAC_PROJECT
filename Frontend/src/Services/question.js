import axios from "axios";
import config from "../config";

export async function getQuestion(questionId) {
    
    const response = await axios.get(`${config.url}/question/get/${questionId}`);
    return response.data;
}


export async function getQuestions(quizId) {
    
    const response = await axios.get(`${config.url}/question/viewQuizQuestions/${quizId}`);
    return response.data;
}


export async function addQuestion(
    question,
    opt1,
    opt2,
    opt3,
    opt4,
    correctAns,
    quizId,
    marks

) {
    const body = {    question,
        opt1,
        opt2,
        opt3,
        opt4,
        correctAns,
        quizId,
        marks };
    const response = await axios.post(`${config.url}/question/add`, body);
    return response.data;
}



export async function editQuestion(
    question,
    opt1,
    opt2,
    opt3,
    opt4,
    correctAns) {
    const body = {  question,
        opt1,
        opt2,
        opt3,
        opt4,
        correctAns };
    const response = await axios.put(`${config.url}/question/edit/{questionId}`,body);
    return response.data;
}
