import Linechart from "../Components/Linechart"
import Timetable from "../Components/Timetable"
import EventBar from "../Components/EventBar"

function StudentDashboard() {

    return (
        <div className="ms-2 row col-md-12">

            <div className="col-md-9">
                <div className="row ">
                    <h3 className="heading">Progress Report</h3>
                    <div>
                        <Linechart></Linechart>
                    </div>
                </div>

                <div class="table-responsive row mt-3" >
                    <h3 className="heading">Weekly Timetable</h3>
                    <Timetable></Timetable>
                </div>
            </div>
            <div className="col-md-3">
                <EventBar></EventBar>
            </div>

        </div>
    )
}
export default StudentDashboard


// import React, { useEffect, useState } from 'react';
// import { getTimeTable } from "../Services/timeTable"
// import Linechart from "../Components/Linechart";
// import Timetable from "../Components/Timetable";
// import EventBar from "../Components/EventBar";

// function StudentDashboard() {
//     const [timetable, setTimetable] = useState(null);

//     useEffect(() => {
//         async function fetchTimetable() {
//             try {
//                 const role = 'STUDENT'; // Or dynamically set based on context
//                 const data = await getTimeTable(role);
//                 setTimetable(data);
//             } catch (error) {
//                 console.error('Error fetching timetable:', error);
//             }
//         }

//         fetchTimetable();
//     }, []);

//     return (
//         <div className="ms-2 row col-md-12">
//             <div className="col-md-9">
//                 <div className="row">
//                     <h3 className="heading">Progress Report</h3>
//                     <div>
//                         <Linechart></Linechart>
//                     </div>
//                 </div>

//                 <div className="table-responsive row mt-3">
//                     <h3 className="heading">Weekly Timetable</h3>
//                     <Timetable data={timetable} /> {/* Pass timetable data here */}
//                 </div>
//             </div>
//             <div className="col-md-3">
//                 <EventBar></EventBar>
//             </div>
//         </div>
//     );
// }

// export default StudentDashboard;
