import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux"
import { getAllEvents } from "../Services/event";
import { getAllAnnouncement} from "../Services/announcement";
import { getAllHoliday } from "../Services/holiday";

export default function EventBar() {
    const user = useSelector((state) => state.user);
    const [events, setEvents] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [holidays, setHolidays] = useState([]);

    useEffect(() => {
        // Fetch data when the component mounts
        const fetchData = async () => {
            try {
                const eventsData = await getAllEvents();
                const announcementsData = await getAllAnnouncement();
                const holidaysData = await getAllHoliday();
                
                // Set the latest 2 items
                setEvents(eventsData.slice(0, 2));
                setAnnouncements(announcementsData.slice(0, 2));
                setHolidays(holidaysData.slice(0, 2));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    };

    return (
        <div style={{ width: '100%' }}>
            <div className="card mb-2 ms-2">
                <div className="card-header" style={{ backgroundColor: 'rgb(7, 58, 112)' }}>EVENT</div>
                <div className="card-body">
                    {events.length > 0 ? (
                        events.map((event, index) => (
                            <div key={index}>
                                <h5 className="card-title">{event.eventTitle}</h5>
                                <p className="card-text">{event.eventDesc}</p>
                                <p className="card-text"><strong>From:</strong> {formatDate(event.eventFrom)}</p>
                                <p className="card-text"><strong>To:</strong> {formatDate(event.eventTo)}</p>
                            </div>
                        ))
                    ) : (
                        <p>No events available</p>
                    )}
                </div>
            </div>

            <div className="card mb-2 ms-2 mt-3">
                <div className="card-header" style={{ backgroundColor: '#1f8372' }}>ANNOUNCEMENT</div>
                <div className="card-body">
                    {announcements.length > 0 ? (
                        announcements.map((announcement, index) => (
                            <div key={index}>
                                <h5 className="card-title"></h5>
                                <p className="card-text">{announcement.announcementDescription}</p>
                            </div>
                        ))
                    ) : (
                        <p>No announcements available</p>
                    )}
                </div>
            </div>
            {user.loginRole !== "Student" && (
                <div className="card mb-2 ms-2 mt-3">
                    <div className="card-header" style={{ backgroundColor: '#e26f9b' }}>HOLIDAYS</div>
                    <div className="card-body">
                        {holidays.length > 0 ? (
                            holidays.map((holiday, index) => (
                                <div key={index}>
                                    <h5 className="card-title">{holiday.holidayTitle}</h5>
                                    <p className="card-text"><strong>From:</strong> {formatDate(holiday.holidayFrom)}</p>
                                <p className="card-text"><strong>To:</strong> {formatDate(holiday.holidayTo)}</p>
                                </div>
                            ))
                        ) : (
                            <p>No holidays available</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}