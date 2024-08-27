import axios from "axios";
import config from "../config";

export async function addResult( sqId, markedOptions) {
  const body = { sqId, markedOptions };
  const response = await axios.post(`${config.url}/result/generate`,body);
  return response.data;
}

export async function getStudentGraphData(id) {
    
    const response = await axios.get(`${config.url}/result/getStudentGraphData/${id}`);
    return response.data;
}


export async function getMinMaxData(id) {
    
    const response = await axios.get(`${config.url}/result/getMinMaxData/${id}`);
    return response.data;
}


export async function getQuizAnalysisBySqID( quizId, studId) {
    const body = { quizId, studId};
    const response = await axios.post(`${config.url}/result/getQuizAnalysisBySqID`,body);
    return response.data;
}


export async function getQuizByStudentId(id) {
    
    const response = await axios.get(`${config.url}/result/getQuizByStudentId/${id}`);
    return response.data;
}
  