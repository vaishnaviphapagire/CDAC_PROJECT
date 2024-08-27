import axios from "axios";
import config from "../config";

export async function addAnnouncement(announcementDescription){
    const body={announcementDescription,}
    const response = await axios.post(`${config.url}/announcement/addAnnouncement`,body);
    return response.data;
} 

export async function getAllAnnouncement(){
    const response= await axios.get(`${config.url}/announcement/getAllAnnouncement`);
    return response.data;
}

export async function editAnnouncement(announcementDescription){
    const body={announcementDescription,}
    const response = await axios.put(`${config.url}/announcement/editAnnouncement`);
    return response.data;

}

export async function deleteAnnouncement(announcementId){
    const response = await axios.delete(`${config.url}/announcement/{announcementId}`);
}
