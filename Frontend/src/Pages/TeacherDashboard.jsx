import React from 'react';
import Timetable from '../Components/Timetable';
import ResLinechart from '../Components/ResLinechat';
import EventBar from '../Components/EventBar';

function TeacherDashboard() {
    return (
        <div className="ms-2 col-md-12 row">
            <div className='col-md-9'>
                <div className="row  ">
                    <h3 className="heading">Progress Report</h3>
                    <div>
                        <ResLinechart></ResLinechart>
                    </div>
                </div>
                <div class="table-responsive row  mt-3" >
                    <h3 className="heading">Weekly Timetable</h3>
                    <Timetable />
                </div>
            </div>
            <div className='col-md-3'>
                <EventBar></EventBar>
            </div>

        </div>
    );
}

export default TeacherDashboard;