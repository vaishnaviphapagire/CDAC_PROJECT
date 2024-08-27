import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IoMdHome } from 'react-icons/io';
import { MdQuiz } from 'react-icons/md';
import { BsFileBarGraphFill, BsCalendarCheckFill, BsCalendarCheck } from 'react-icons/bs';
import { GrAdd } from 'react-icons/gr';

export default function TeacherSidebar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeAccordion, setActiveAccordion] = useState('');

    // Handle click on accordion header
    const handleAccordionClick = (accordionId) => {
        setActiveAccordion(activeAccordion === accordionId ? '' : accordionId);
    };

    // Handle click on links inside the accordion
    const handleLinkClick = () => {
        // Do not close the accordion on these clicks
        // Implement any specific behavior if needed
    };

    // Handle click on other sidebar buttons
    const handleSidebarButtonClick = (accordionId) => {
        setActiveAccordion(''); // Close all accordions
        navigate('/'); // You can use navigate to go to other routes if needed
    };

    const navigateToCompletedQuiz = () => {
        navigate('/completed-quiz');
        handleLinkClick(); // Optionally handle link click here
    };

    return (
        <div>
            <div className="sidebar-content">
                <Link
                    className="btn btn-lg btn-sidebar"
                    to='/TeacherDashboard'
                    onClick={() => handleSidebarButtonClick('')}
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
                            >
                                <MdQuiz className="me-1" /> Quiz
                            </button>
                        </h2>
                        <div
                            id="collapseQuiz"
                            className={`accordion-collapse collapse ${activeAccordion === 'quiz' ? 'show' : ''}`}
                            data-bs-parent="#accordionExample"
                        >
                            <div className="accordion-body">
                                <Link
                                    className="btn btn-lg btn-sidebar"
                                    to="/TeacherCompletedQuiz"
                                    onClick={() => {
                                        navigateToCompletedQuiz();
                                        handleLinkClick();
                                    }}
                                >
                                    <BsCalendarCheckFill /> Completed Quiz
                                </Link>
                                <Link
                                    className="btn btn-lg btn-sidebar"
                                    to="/TeacherScheduledQuiz"
                                    onClick={handleLinkClick}
                                >
                                    <BsCalendarCheck /> Scheduled Quiz
                                </Link>
                                <Link
                                    className="btn btn-lg btn-sidebar"
                                    to="/TeacherAddQuiz"
                                    onClick={handleLinkClick}
                                >
                                    <GrAdd /> Add Quiz
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sidebar-content">
                <Link
                    className="btn btn-lg btn-sidebar"
                    to='/AdminResult'
                    onClick={() => handleSidebarButtonClick('')}
                >
                    <BsFileBarGraphFill /> Result
                </Link>
            </div>

            {/* Add more sidebar items as needed */}
        </div>
    );
}
