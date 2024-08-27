import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../Features/UserSlice';
import { IoMdHome } from 'react-icons/io';
import { MdOutlineAppRegistration, MdAnnouncement, MdOutlinePreview, MdHolidayVillage, MdEmojiEvents } from 'react-icons/md';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { PiStudentFill } from 'react-icons/pi';
import { RiCalendarScheduleFill } from 'react-icons/ri';
import { TbCategoryFilled, TbListDetails } from 'react-icons/tb';
import { SiGoogleclassroom } from 'react-icons/si';
import { GrAdd } from 'react-icons/gr';
import { MdSubject } from "react-icons/md";

export default function AdminSidebar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeLink, setActiveLink] = useState('');
    const [activeAccordion, setActiveAccordion] = useState('');

    

    const handleAccordionClick = (id) => {
        setActiveAccordion(activeAccordion === id ? '' : id); // Toggle the accordion
    };

    const handleLinkClick = (link) => {
        setActiveLink(link); // Set the active link
        setActiveAccordion(''); // Close all accordions when a link is clicked
    };

    const navigateToRegister = (role) => {
        navigate('/Register', { state: { role } });
    };

    const navigateToAddSubject = () => {
        navigate('/AddSubject');
    };

    const navigateToViewSubject = () => {
        navigate('/ViewSubject');
    };

    const navigateToBatchDetails = () => {
        navigate('/BatchDetails');
    };

    const navigateToAddBatch = () => {
        navigate('/AddBatch');
    };

    return (
        <div>
            <div className="sidebar-content">
                <Link
                    className={`btn btn-lg btn-sidebar ${activeLink === 'dashboard' ? 'active-link' : ''}`}
                    onClick={() => handleLinkClick('dashboard')}
                    to='/AdminDashboard'
                >
                    <IoMdHome /> Dashboard
                </Link>
            </div>
            <div className="sidebar-content">
                <div className="accordion" id="accordionRegistration">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className={`accordion-button btn-sidebar ${activeAccordion === 'registration' ? '' : 'collapsed'}`}
                                type="button"
                                onClick={() => handleAccordionClick('registration')}
                            >
                                <MdOutlineAppRegistration className="me-1" /> Registration
                            </button>
                        </h2>
                        <div
                            id="collapseRegistration"
                            className={`accordion-collapse collapse ${activeAccordion === 'registration' ? 'show' : ''}`}
                            data-bs-parent="#accordionRegistration"
                        >
                            <div className="accordion-body">
                                <button
                                    className="btn btn-lg btn-sidebar"
                                    onClick={() => navigateToRegister('TEACHER')}
                                >
                                    <FaChalkboardTeacher /> Teacher
                                </button>
                                <button
                                    className="btn btn-lg btn-sidebar"
                                    onClick={() => navigateToRegister('STUDENT')}
                                >
                                    <PiStudentFill /> Student
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sidebar-content">
                <Link
                    className={`btn btn-lg btn-sidebar ${activeLink === 'AddTimeTable' ? 'active-link' : ''}`}
                    onClick={() => handleLinkClick('AddTimeTable')}
                    to="/AddTimeTable"
                >
                    <RiCalendarScheduleFill /> Timetable
                </Link>
            </div>
            <div className="sidebar-content">
                <div className="accordion" id="accordionSubjects">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className={`accordion-button btn-sidebar ${activeAccordion === 'subjects' ? '' : 'collapsed'}`}
                                type="button"
                                onClick={() => handleAccordionClick('subjects')}
                            >
                                <MdSubject className="me-1" /> Subject
                            </button>
                        </h2>
                        <div
                            id="collapseSubjects"
                            className={`accordion-collapse collapse ${activeAccordion === 'subjects' ? 'show' : ''}`}
                            data-bs-parent="#accordionSubjects"
                        >
                            <div className="accordion-body">
                                <button
                                    className="btn btn-lg btn-sidebar"
                                    onClick={navigateToAddSubject}
                                >
                                    <GrAdd /> Add Subject
                                </button>
                                <button
                                    className="btn btn-lg btn-sidebar"
                                    onClick={navigateToViewSubject}
                                >
                                    <MdOutlinePreview /> View Subjects
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sidebar-content">
                <div className="accordion" id="accordionBatches">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className={`accordion-button btn-sidebar ${activeAccordion === 'batches' ? '' : 'collapsed'}`}
                                type="button"
                                onClick={() => handleAccordionClick('batches')}
                            >
                                <SiGoogleclassroom className='me-1'/> Batch
                            </button>
                        </h2>
                        <div
                            id="collapseBatches"
                            className={`accordion-collapse collapse ${activeAccordion === 'batches' ? 'show' : ''}`}
                            data-bs-parent="#accordionBatches"
                        >
                            <div className="accordion-body">
                                <button
                                    className="btn btn-lg btn-sidebar"
                                    onClick={navigateToAddBatch}
                                >
                                    <GrAdd /> Add Batch
                                </button>
                                <button
                                    className="btn btn-lg btn-sidebar"
                                    onClick={navigateToBatchDetails}
                                >
                                    <MdOutlinePreview /> Batch Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sidebar-content">
                <Link
                    className={`btn btn-lg btn-sidebar ${activeLink === 'AddAnnouncement' ? 'active-link' : ''}`}
                    onClick={() => handleLinkClick('AddAnnouncement')}
                    to="/AddAnnouncement"
                >
                    <MdAnnouncement /> Announcement
                </Link>
            </div>
            <div className="sidebar-content">
                <Link
                    className={`btn btn-lg btn-sidebar ${activeLink === 'AddEvent' ? 'active-link' : ''}`}
                    onClick={() => handleLinkClick('AddEvent')}
                    to="/AddEvent"
                >
                    <MdEmojiEvents /> Event
                </Link>
            </div>
            <div className="sidebar-content">
                <Link
                    className={`btn btn-lg btn-sidebar ${activeLink === 'AddHoliday' ? 'active-link' : ''}`}
                    onClick={() => handleLinkClick('AddHoliday')}
                    to="/AddHoliday"
                >
                    <MdHolidayVillage /> Holiday
                </Link>
            </div>
        </div>
    );
}
