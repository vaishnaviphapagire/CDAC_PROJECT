import axios from "axios";
import config from "../config";

export async function addTimeTable(
    role,
    startDate,
    endDate,
    timeSlot
) {
  const body = { 
    role,
    startDate,
    endDate,
    timeSlot
   };
  const response = await axios.post(`${config.url}/timeTable/add`,body);
  return response.data;
}



export async function deleteTimeTableByRole(role) {
    
    const response = await axios.delete(`${config.url}/timeTable/delete/{role}`);
    return response.data;
}


export async function getTimeTable(role) {
  try {
      const response = await axios.get(`${config.url}/timeTable/view/${role}`);
      return response.data;
  } catch (error) {
      throw new Error('Failed to fetch timetable: ' + error.message);
  }
}





