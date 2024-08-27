import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAction } from '../Features/UserSlice';
import { IoMdHome } from "react-icons/io";
import { MdQuiz } from "react-icons/md";
import { BsFileBarGraphFill, BsCalendarCheckFill, BsCalendarCheck } from "react-icons/bs";
import { MdLiveHelp } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";

export default function StudentSidebar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeAccordion, setActiveAccordion] = useState(''); // Track open accordion
    const [activeLink, setActiveLink] = useState(''); // Track active link

    const handleAccordionClick = (id) => {
        setActiveAccordion(prevAccordion => (prevAccordion === id ? '' : id));
    };

    const handleLinkClick = (link) => {
        setActiveLink(link); // Set active link
        setActiveAccordion(''); // Close all accordions
    };

    const handleAccordionItemClick = (link) => {
        setActiveLink(link); // Set active link
    };

    const onLogout = () => {
        dispatch(logoutAction());
        navigate('/Login');
    };

    return (
        <div>
            <div className="sidebar-content" style={{ marginTop: '10px' }}>
                <Link
                    className={`btn btn-lg btn-sidebar ${activeLink === 'dashboard' ? 'active-link' : ''}`}
                    to='/StudentDashboard'
                    onClick={() => handleLinkClick('dashboard')}
                >
                    <IoMdHome /> Dashboard
                </Link>
            </div>

            <div className="sidebar-content">
                {/* Accordion for Quiz */}
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className={`accordion-button btn-sidebar ${activeAccordion === 'quiz' ? '' : 'collapsed'}`}
                                type="button"
                                onClick={() => handleAccordionClick('quiz')}
                                aria-expanded={activeAccordion === 'quiz'}
                                aria-controls="collapseOne"
                            >
                                <MdQuiz className="me-1" /> Quiz
                            </button>
                        </h2>
                        <div
                            id="collapseOne"
                            className={`accordion-collapse collapse ${activeAccordion === 'quiz' ? 'show' : ''}`}
                            data-bs-parent="#accordionExample"
                        >
                            <div className="accordion-body">
                                <Link
                                    className={`btn btn-lg btn-sidebar ${activeLink === 'completedQuiz' ? 'active-link' : ''}`}
                                    to='/CompletedQuiz'
                                    onClick={() => handleAccordionItemClick('completedQuiz')}
                                >
                                    <BsCalendarCheckFill /> Completed Quiz
                                </Link>
                                <Link
                                    className={`btn btn-lg btn-sidebar ${activeLink === 'scheduledQuiz' ? 'active-link' : ''}`}
                                    to='/ScheduledQuiz'
                                    onClick={() => handleAccordionItemClick('scheduledQuiz')}
                                >
                                    <BsCalendarCheck /> Scheduled Quiz
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sidebar-content">
                <Link
                    className={`btn btn-lg btn-sidebar ${activeLink === 'result' ? 'active-link' : ''}`}
                    to='/StudentResult'
                    onClick={() => handleLinkClick('result')}
                >
                    <BsFileBarGraphFill /> Result
                </Link>
            </div>

            <div className="sidebar-content">
                <Link
                    className={`btn btn-lg btn-sidebar ${activeLink === 'help' ? 'active-link' : ''}`}
                    to='/Help'
                    onClick={() => handleLinkClick('help')}
                >
                    <MdLiveHelp /> Help
                </Link>
            </div>

        
        </div>
    );
}
