import axios from "axios";
import config from "../config";


export async function addQuiz(title, quizTime, quizMarks, passingMarks, subjectId, batchId) {

    const body = {
        title, quizTime, quizMarks, passingMarks, subjectId, batchId
    }
    const response = await axios.post(`${config.url}/quiz/add`, body);
    return response.data;
}

export async function getAllQuiz() {
    const response = await axios.get(`${config.url}/quiz/viewAll`)
    return response.data
}
export async function getAllSheduledQuiz() {
    const response = await axios.get(`${config.url}/quiz/viewScheduledQuiz`)
    return response.data
}
export async function getAllCompletedQuiz() {

    const response = await axios.get(`${config.url}/quiz/viewCompletedQuiz`)

    return response.data
}
export async function scheduleQuiz(id, scheduleData) {
    const response = await axios.post(`${config.url}/quiz/scheduleQuiz/${id}`, scheduleData);
    return response.data;
}

export async function getBatchWiseQuiz(id) {
    const response = await axios.get(`${config.url}/quiz/viewBacthWiseQuiz/${id}`)
    return response.data
}
export async function getSubjectWiseQuiz(id) {

    const response = await axios.get(`${config.url}/quiz/viewSubjectWiseQuiz/${id}`)

    return response.data
}

export async function getQuizById(id){
    const response = await axios.get(`${config.url}/quiz/getQuiz/${id}`)
    return response.data
}
