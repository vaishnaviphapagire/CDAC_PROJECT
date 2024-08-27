import axios from "axios";
import config from "../config";

export async function addSubject(subName) {
  const body = {
    subName,
  };
  const response = await axios.post(`${config.url}/subject/addSubject`, body);
  return response.data
}

export async function getSubjects() {
   
    const response = await axios.get(`${config.url}/subject/getAllSubject`);
    return response.data
}