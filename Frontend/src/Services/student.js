import axios from "axios";
import config from "../config";

export async function addStudent(
    email,
    password,
    name,
    phone,
    gender,
    address,
    dob,
    role,
    batchId,
    guardianName,
    guardianPhone

) {
  const body = { 
    email,
    password,
    name,
    phone,
    gender,
    address,
    dob,
    role,
    batchId,
    guardianName,
    guardianPhone
   };
  const response = await axios.post(`${config.url}/student/add`,body);
  return response.data;
}

export async function getStudentById(id) {
    
    const response = await axios.get(`${config.url}/student/getById/{id}`);
    return response.data;
}

