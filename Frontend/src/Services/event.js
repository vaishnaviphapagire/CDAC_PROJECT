import axios from "axios";
import config from "../config";

export async function getAllEvents() {
    
    const response = await axios.get(`${config.url}/event/getAllEvent`);
    return response.data;
}



export async function addEvent(
    eventTitle,
    eventDesc,
    eventFrom,
    eventTo
) {
    const body = { eventTitle,
        eventDesc,
        eventFrom,
        eventTo };
    const response = await axios.post(`${config.url}/event/addEvent`, body);
    return response.data;
}



export async function editBatch(
    eventId,
    eventTitle,
    eventDesc,
    eventFrom,
    eventTo) {
    const body = { eventId,
        eventTitle,
        eventDesc,
        eventFrom,
        eventTo };
    const response = await axios.put(`${config.url}/event/editEvent`,body);
    return response.data;
}

export async function deleteEvent(eventId) {
    
    const response = await axios.delete(`${config.url}/event/${eventId}`);
    return response.data;
}
