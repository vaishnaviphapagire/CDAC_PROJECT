// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { logoutAction } from '../Features/UserSlice';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { OverlayTrigger, Popover, Button } from 'react-bootstrap';
// import logo from '../Images/Logo2.png';
// import { MdOutlineEdit } from "react-icons/md";
// import { FaUserMinus } from "react-icons/fa6";
// import { CgProfile } from "react-icons/cg";
// import userSignIn from '../Images/User.png'
// import 'bootstrap/dist/css/bootstrap.min.css';

// function Navbar() {

//     // const token = sessionStorage.getItem('token')
//     const navigate = useNavigate();
//     const dispatch = useDispatch();


//     const user = useSelector((state) => state.user)
//     const [showPopover, setShowPopover] = useState(false);
//     const [userDetail, setUserDetails] = useState([]);

//     const userDetails = { // temporary rendering data
//         image: '',
//         name: 'Name Surname',
//         email: 'email@gmail.com',
//         batchName: 'Batch Name',
//         role: "Userrole"
//     }

//     const onLogout = () => {
//         dispatch(logoutAction());
//         //clear session storage 
//         navigate('/');
//     };

//     const onEditProfile = () => {
//         setShowPopover(!showPopover);
//     };

//     const getUserDetails = () => {
//         //send the token along with request to get user details 
//         //setUserDetail(response.data);
//     }
//     const updateUser = () => {
//         navigate('/EditProfile');
//     }


//     const popover = (
//         <Popover id="popover-basic" className='popover'>

//             <Popover.Body>
//                 <center>
//                     <img src={userSignIn} style={{ borderRadius: '50%', width: '60px', height: '60px' }} />
//                     <div ><h4>{user.loginName}</h4></div>
//                     <div><a href={`mailto:${user.loginEmail}`}>{user.loginEmail}</a></div>

//                     {
//                         user.loginRole === "STUDENT" ? <div>Batch : {user.batchName}</div> : 
//                         user.loginRole==="TEACHER"?<div>{user.designation}</div>:<div></div>
//                     }

//                 </center>
//                 <hr></hr>
//                 <div style={{ display: 'inline-flex', flex:'1'}}>
//                     <div>
//                         <Button className="btn-light me-2 update" onClick={updateUser}>
//                             <MdOutlineEdit /> 
//                         </Button>
//                     </div>
//                     <div  style={{float:'right'}}>
//                         <button
//                             className="btn btn-light ms-5"   
//                             style={{fontSize:'smaller' }}                        
//                             onClick={onLogout}
//                         ><FaUserMinus /> Logout
//                         </button>
//                     </div>
//                 </div>
//             </Popover.Body>

//         </Popover>
//     );

//     return (
//         <nav class="navbar navbar-expand-lg fixed-top ">
//             <div class="container-fluid">
//                 <a class="navbar-brand" href="#">
//                     <img src={logo} style={{ height: "50%", width: '45%' }} ></img>
//                     {/* <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" /> */}
//                 </a>
//                 <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="true" aria-label="Toggle navigation">
//                     <span class="navbar-toggler-icon"></span>
//                 </button>
//                 <div class="collapse navbar-collapse  flex-row-reverse" id="navbarNav">
//                     <ul class="navbar-nav ">
//                         <h4>{user.loginName}</h4>
//                         <li class="nav-item">
//                             <OverlayTrigger
//                                 trigger="click"
//                                 placement="bottom-start"
//                                 overlay={popover}
//                                 show={showPopover}
//                                 rootClose
//                                 onToggle={onEditProfile}>
//                                 <button className="btn btn-lg btn-sidebar" style={{ color: 'black' }} >
//                                 <img src={userSignIn} style={{ borderRadius: '50%', width: '50px', height: '50px' }} /></button>

//                             </OverlayTrigger>
//                         </li>

//                     </ul>
//                 </div>
//             </div>
//         </nav>
//     );
// }

// export default Navbar;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';
import { logoutAction } from '../Features/UserSlice';
import { logoutImage } from '../Features/ImageSlice';
import logo from '../Images/Logo2.png';
import userSignIn from '../Images/User.png';
import { MdOutlineEdit } from "react-icons/md";
import { FaUserMinus } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const userImage = useSelector(state => state.image.userImage)
    const userImage = sessionStorage.getItem('userImage')
    console.log("Image from reduc "+userImage)
    const user = useSelector(state => state.user);

    const [showPopover, setShowPopover] = useState(false);

    const onLogout = () => {
        dispatch(logoutAction());
        dispatch(logoutImage()); // Clear user image on logout
        sessionStorage.removeItem('userImage')
        navigate('/');
    };

    const onEditProfile = () => {
        setShowPopover(!showPopover);
    };

    const updateUser = () => {
        navigate('/EditProfile');
    };

    const popover = (
        <Popover id="popover-basic" className='popover'>
            <Popover.Body>
                <center>
                    <img src={userImage} alt="User" style={{ borderRadius: '50%', width: '60px', height: '60px' }} />
                    <div><h4>{user.loginName}</h4></div>
                    <div><a href={`mailto:${user.loginEmail}`}>{user.loginEmail}</a></div>
                    {user.loginRole === "STUDENT" ? (
                        <div>Batch: {user.batchName}</div>
                    ) : user.loginRole === "TEACHER" ? (
                        <div>{user.designation}</div>
                    ) : (
                        <div></div>
                    )}
                </center>
                <hr />
                <div style={{ display: 'inline-flex', flex: '1' }}>
                    <Button className="btn-light me-2 update" onClick={updateUser}>
                        <MdOutlineEdit />
                    </Button>
                    <button
                        className="btn btn-light ms-5"
                        style={{ fontSize: 'smaller' }}
                        onClick={onLogout}
                    >
                        <FaUserMinus /> Logout
                    </button>
                </div>
            </Popover.Body>
        </Popover>
    );

    return (
        <nav className="navbar navbar-expand-lg fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src={logo} style={{ height: "50%", width: '45%' }} alt="Logo" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="true" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse flex-row-reverse" id="navbarNav">
                    <ul className="navbar-nav">
                        <h6 className='mt-3'><center>{user.loginName}</center></h6>
                        <li className="nav-item">
                            <OverlayTrigger
                                trigger="click"
                                placement="bottom-start"
                                overlay={popover}
                                show={showPopover}
                                rootClose
                                onToggle={onEditProfile}
                            >
                                <button className="btn btn-lg btn-sidebar" style={{ color: 'black' }}>
                                    <img src={userImage} style={{ borderRadius: '50%', width: '50px', height: '50px' }} alt="User Profile" />
                                </button>
                            </OverlayTrigger>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
