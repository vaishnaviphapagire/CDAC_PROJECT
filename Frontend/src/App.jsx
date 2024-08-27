import { useSelector } from 'react-redux';
import { Route, Routes, redirect } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AdminSidebar from './Components/AdminSidebar';
import Navbar from './Components/Navbar';
import StudentSidebar from './Components/StudentSidebar';
import TeacherSidebar from './Components/TeacherSidebar';
import AddAnnouncement from './Pages/AddAnnouncement';
import AddBatch from './Pages/AddBatch';
import AddEvent from './Pages/AddEvent';
import AddHoliday from './Pages/AddHoliday';
import { AddQuestions } from './Pages/AddQuestions';
import TeacherAddQuiz from './Pages/AddQuiz';
import AddSubject from './Pages/AddSubject';
import AddTimetable from './Pages/AddTimeTable';
import AdminDashboard from './Pages/AdminDashboard';
import AdminResult from './Pages/AdminResult';
import AdminScheduledQuiz from './Pages/AdminScheduleQuiz';
import AllQuizes from './Pages/AllQuizes';
import { AttempQuiz } from './Pages/AttempQuiz';
import BatchDetails from './Pages/BatchDetails';
import BatchStudents from './Pages/BatchStudents';
import CompletedQuiz from './Pages/CompletedQuiz';
import EditProfile from './Pages/EditProfile';
import Help from './Pages/Help';
import Login from './Pages/Login';
import Register from './Pages/Register';
import RegisterStudent from './Pages/RegisterStudent';
import ScheduledQuiz from './Pages/ScheduledQuiz';
import StudentDashboard from './Pages/StudentDashboard';
import StudentResult from './Pages/StudentResult';
import TeacherDashboard from './Pages/TeacherDashboard';
import TeacherDetails from './Pages/TeacherDetails';
import ViewQuizQuestion from './Pages/ViewQuestionStudent';
import ViewSubject from './Pages/ViewSubject';
import { ToastContainer } from 'react-toastify';
import TeacherScheduledQuiz from './Pages/TeacherScheduledQuiz';
import { TeacherCompletedQuiz } from './Pages/TeacherCompletedQuiz';
function App() {

  const user = useSelector((state) => state.user)
  return (
    <div>
      {
        user.loginStatus ? (
          <div className='container-fluid'>
            {user.loginStatus && < Navbar ></Navbar>}
            <div className=' ' style={{ marginTop: '100px' }}>
              <div className='col-md-2 shadow ' onLoad={redirect} style={{ position: 'fixed', height: '100%' }} >
                {
                  user.loginRole === "ADMIN" ? <AdminSidebar />
                    : (user.loginRole === "TEACHER" ? <TeacherSidebar /> : <StudentSidebar />)
                }
              </div>
              <div className='col-md-10 offset-2 container-fluid'>
                <Routes>
                  {
                    user.loginRole === "ADMIN" ? <Route path='/dashBoard' element={<AdminDashboard />} />
                      : (user.loginRole === "TEACHER" ? <Route path='/dashBoard' element={<TeacherDashboard />} />
                        : <Route path='/dashBoard' element={<StudentDashboard />} />)
                  }
                  <Route path='/StudentDashboard' element={<StudentDashboard />} />
                  <Route path='/TeacherDashboard' element={<TeacherDashboard />} />
                  <Route path='/AdminDashboard' element={<AdminDashboard />} />
                  <Route path='/CompletedQuiz' element={<CompletedQuiz />} />
                  <Route path='/ScheduledQuiz' element={<ScheduledQuiz />} />
                  <Route path='/TeacherAddQuiz' element={<TeacherAddQuiz />} />
                  <Route path='/ViewQuizQuestion/:quizId' element={<ViewQuizQuestion />} />
                  <Route path='/Help' element={<Help />} />
                  <Route path='/AddAnnouncement' element={<AddAnnouncement />} />
                  <Route path='/addQuestions' element={<AddQuestions />} />
                  <Route path='/AddSubject' element={<AddSubject />} />
                  <Route path='/AddBatch' element={<AddBatch />} />
                  <Route path='/BatchDetails' element={<BatchDetails />} />
                  <Route path='/BatchStudents/:id' element={<BatchStudents />} />
                  <Route path='/Register' element={<Register />} />
                  <Route path='/AddTimeTable' element={<AddTimetable />} />
                  <Route path='/AddEvent' element={<AddEvent />} />
                  <Route path='/AddHoliday' element={<AddHoliday />} />
                  <Route path='/ViewSubject' element={<ViewSubject />} />
                  <Route path='/EditProfile' element={<EditProfile />} />
                  <Route path='/TeacherDetails' element={<TeacherDetails />} />
                  <Route path='/AllQuizes' element={<AllQuizes />} />
                  <Route path='/AdminScheduledQuiz' element={<AdminScheduledQuiz />} />
                  <Route path='/AdminResult' element={<AdminResult />} />
                  <Route path='/StudentResult' element={<StudentResult />} />
                  <Route path='/attemptExam' element={<AttempQuiz></AttempQuiz>}></Route>
                  <Route path="TeacherScheduledQuiz" element={<TeacherScheduledQuiz></TeacherScheduledQuiz>}></Route>
                  <Route path="/TeacherCompletedQuiz" element={<TeacherCompletedQuiz></TeacherCompletedQuiz>}></Route>
                  {/* <Route path='/RegisterStudent' element={<RegisterStudent/>}/> */}
                </Routes>
                <ToastContainer />
              </div>
            </div>
          </div>
        ) : (
          <div className='container-fluid row' style={{ backgroundImage: 'linear-gradient(to right, rgb(7, 58, 112),#e26f9b)' }} >
            <Routes>
              <Route path='/' element={<Login></Login>} />
              {/* <Route path='/login' element={<Login></Login>}/>    */}
              <Route path='/RegisterStudent' element={<RegisterStudent />} />

            </Routes>
            <ToastContainer />
            {/* <Login isLoginOpen={showLogin} isRegisterOpen={showRegister}></Login>           
             <Link  to="/RegisterStudent"style={{ float: 'left' }}onClick={toRegisterStudent}>Register here</Link>

            <RegisterStudent isRegisterOpen={showRegister} isLoginOpen={showLogin}></RegisterStudent> */}
          </div>
        )

      }
    </div>
  )
}

export default App;

{/* {(user.loginRole === "TEACHER") && <EventBar></EventBar>}
                {(user.loginRole === "STUDENT") && <EventBar></EventBar>}
                {(user.loginRole === "ADMIN") && <EventBar></EventBar>} */}
