import axios from "axios";
import config from "../config";

export async function addBatch(batchName, batchCount) {
  const body = { batchName, batchCount };
  const response = await axios.post(`${config.url}/batch/add`,body);
  return response.data;
}

export async function getAllBatches() {
    
    const response = await axios.get(`${config.url}/batch/allBatches`);
    return response.data;
}

export async function editView(batchId) {
    
    const response = await axios.get(`${config.url}/batch/editView/${batchId}`);
    return response.data;
}

export async function deleteBatch(batchId) {
    
    const response = await axios.delete(`${config.url}/batch/delete/${batchId}`);
    return response.data;
}

export async function editBatch(batchId,batchName, batchCount) {
    const body = { batchName, batchCount };
    const response = await axios.put(`${config.url}/batch/edit/${batchId}`,body);
    return response.data;
}

export async function getStudentListByBatch(batchId) {
    
    const response = await axios.get(`${config.url}/batch/studentList/${batchId}`);
    return response.data;
}