import axios from "axios";
import config from "../config";

export async function addHoliday(
    holidayTitle,
    holidayFrom,
    holidayTo
) {
  const body = {
    holidayTitle,
    holidayFrom,
    holidayTo
  };
  const response = await axios.post(`${config.url}/holiday/addHoliday`,body);
  return response.data;
}

export async function getAllHoliday() {
    
    const response = await axios.get(`${config.url}/holiday/getAll`);
    return response.data;
}


export async function deleteHoliday(id) {
    
    const response = await axios.delete(`${config.url}/holiday/deleteHolidayById/${id}`);
    return response.data;
}

export async function editHoiday(
    hoildayId,
    holidayTitle,
    holidayFrom,
    holidayTo
) {
    const body = {
        hoildayId,
        holidayTitle,
        holidayFrom,
        holidayTo
    };
    const response = await axios.put(`${config.url}/holiday/editHoliday/`,body);
    return response.data;
}

