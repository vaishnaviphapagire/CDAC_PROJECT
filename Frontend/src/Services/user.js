import axios from "axios";
import config from "../config";

export async function registerTeacher(
  email,
  password,
  name,
  phone,
  gender,
  role,
  designation,
  education,
  subjectId
) {
  const body = {
    email,
    password,
    name,
    phone,
    gender,
    role,
    designation,
    education,
    subjectId
  };

  const response = await axios.post(`${config.url}/teacher/addTeacher`, body);
  return response.data;
}


export async function registerStudent(
  email,
  password,
  name,
  phone,
  gender,

  role,
  batchId,

) {
  const body = {
    email,
    password,
    name,
    phone,
    gender,

    role,
    batchId,
  };


  const response = await axios.post(`${config.url}/student/add`, body);
  return response.data;
}

export async function login(email, password, role) {
  const body = {
    email,
    password,
    role,

  }

  const response = await axios.post(`${config.url}/user/login`, body)

  console.log("in service : " + response.data)
  return response.data;
}


export async function getProfileById(id) {
 

 const response = await axios.get(`${config.url}/user/getProfileById/${id}`)


  console.log("in service : " + response.data)
  return response.data;
}