import axios from "axios";
import config from "../config";

export async function getAllTeachers()
{
    const response = await axios.get(`${config.url}/teacher/getAllTeacher`)
    return response.data;
}

export async function deleteTeacher(id){
    const response = await axios.delete(`${config.url}/teacher/${id}`)
    return response.data;
}

