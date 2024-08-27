// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// export default function EditProfile() {
//     const user = useSelector((state) => state.user); // Assuming the user object is stored in state.user
//     const role = user.loginRole; // Extract the role from the user object
//     const navigate = useNavigate();

//     // Common fields
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [phone, setPhone] = useState('');
//     const [dob, setDob] = useState('');
//     const [gender, setGender] = useState('');
//     const [address, setAddress] = useState('');

//     // Role-specific fields
//     const [batch, setBatch] = useState('');
//     const [guardianName, setGuardianName] = useState('');
//     const [guardianPhone, setGuardianPhone] = useState('');
//     const [rollNo, setRollNo] = useState('');
//     const [education, setEducation] = useState('');
//     const [designation, setDesignation] = useState('');
//     const [subjectId, setSubject] = useState(new Set());

//     const subjects = [
//         { subId: 1, subName: 'Maths' },
//         { subId: 2, subName: 'Physics' },
//         { subId: 3, subName: 'Chemistry' },
//         { subId: 4, subName: 'Biology' }
//     ];

//     const designations = [
//         'PROFESSOR', 'ASSISTANT_PROFESSOR', 'VISITING_FACULTY', 'LAB_FACULTY'
//     ];

//     const addSubject = (subId) => {
//         setSubject(prev => new Set(prev).add(subId));
//     };

//     const handleSubmit = () => {
//         const data = {
//             name, email, password, phone, dob, gender, address
//         };

//         if (role === "STUDENT") {
//             Object.assign(data, { batch, guardianName, guardianPhone, rollNo });
//         } else if (role === "TEACHER") {
//             Object.assign(data, { education, designation, subjects: Array.from(subjectId) });
//         }

//         // Send data to API or handle it as needed
//         alert("Profile Updated!");
//         navigate('/'); // Redirect after successful update
//     };

//     const renderRoleSpecificFields = () => {
//         if (role === "STUDENT") {
//             return (
//                 <>
//                     <div className="mb-3 mt-3 input-group">
//                         <label htmlFor="batch" className="mb-3">Batch</label>
//                         <input type="text" id="batch" className="input-group" placeholder="Batch" value={batch}
//                             onChange={(e) => setBatch(e.target.value)} />
//                     </div>
//                     <div className="mb-3 mt-3 input-group">
//                         <label htmlFor="guardianName" className="mb-3">Guardian Name</label>
//                         <input type="text" id="guardianName" className="input-group" placeholder="Guardian Name" value={guardianName}
//                             onChange={(e) => setGuardianName(e.target.value)} />
//                     </div>
//                     <div className="mb-3 mt-3 input-group">
//                         <label htmlFor="guardianPhone" className="mb-3">Guardian Contact</label>
//                         <input type="text" id="guardianPhone" className="input-group" placeholder="Guardian Contact" value={guardianPhone}
//                             onChange={(e) => setGuardianPhone(e.target.value)} />
//                     </div>
//                     <div className="mb-3 mt-3 input-group">
//                         <label htmlFor="rollNo" className="mb-3">Roll No</label>
//                         <input type="text" id="rollNo" className="input-group" placeholder="Roll No" value={rollNo}
//                             onChange={(e) => setRollNo(e.target.value)} />
//                     </div>
//                 </>
//             );
//         } else if (role === "TEACHER") {
//             return (
//                 <>
//                     <div className="mb-3 mt-3 input-group">
//                         <label htmlFor="education" className="mb-3">Education</label>
//                         <input type="text" id="education" className="input-group" placeholder="Education" value={education}
//                             onChange={(e) => setEducation(e.target.value)} />
//                     </div>
//                     <div className="mb-3 mt-3 input-group">
//                         <label htmlFor="designation" className="mb-3">Designation</label>
//                         <select id="designation" className="input-group" value={designation} onChange={(e) => setDesignation(e.target.value)}>
//                             <option value="">Select Designation</option>
//                             {designations.map((desig) => (
//                                 <option key={desig} value={desig}>{desig}</option>
//                             ))}
//                         </select>
//                     </div>
//                     <div className="mb-3 mt-3 input-group">
//                         <label htmlFor="subjects" className="mb-3">Subjects</label>
//                         <div id="subjects" className="input-group" style={{ border: '1px solid rgba(0, 2, 4, 0.207)', borderRadius: '20px', padding: '20px' }}>
//                             {subjects.map((sub) => (
//                                 <div key={sub.subId} className="mb-2">
//                                     <input type="checkbox" id={`subject-${sub.subId}`} value={sub.subId} onChange={(e) => addSubject(Number(e.target.value))} />
//                                     <label htmlFor={`subject-${sub.subId}`} className="ms-2">{sub.subName}</label>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </>
//             );
//         }
//         return null;
//     };

//     return (
//         <div className="container col-md-8" style={{ border: '1px solid rgba(0, 2, 4, 0.207)', borderRadius: '20px', padding: '20px' }}>
//             <div className="mt-3 mb-5">
//                 <div className="heading" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
//                     { role === "ADMIN" ? <h3>Admin Edit Profile</h3>
//                         : (role === "TEACHER" ? <h3>Teacher Edit Profile</h3> : <h3>Student Edit Profile</h3>) }
//                 </div>
//                 <div className="mb-3 mt-3 input-group">
//                     <label htmlFor="name" className="mb-3">Name</label>
//                     <input type="text" id="name" className="input-group" placeholder="Name" value={name} required
//                         onChange={(e) => setName(e.target.value)} />
//                 </div>
//                 <div className="mb-3 mt-3 input-group">
//                     <label htmlFor="email" className="mb-3">Email</label>
//                     <input type="email" id="email" className="input-group" placeholder="Email" value={email} required
//                         onChange={(e) => setEmail(e.target.value)} />
//                 </div>
//                 <div className="mb-3 mt-3 input-group">
//                     <label htmlFor="phone" className="mb-3">Phone No</label>
//                     <input type="text" id="phone" className="input-group" placeholder="Phone No" value={phone}
//                         onChange={(e) => setPhone(e.target.value)} />
//                 </div>
//                 <div className="mb-3 mt-3 input-group">
//                     <label htmlFor="dob" className="mb-3">Date of Birth</label>
//                     <input type="date" id="dob" className="input-group" placeholder="Date of Birth" value={dob}
//                         onChange={(e) => setDob(e.target.value)} />
//                 </div>
//                 <div className="mb-3 mt-3 input-group">
//                     <label htmlFor="gender" className="mb-3">Gender</label>
//                     <select id="gender" className="input-group" value={gender} onChange={(e) => setGender(e.target.value)}>
//                         <option value="">Select Gender</option>
//                         <option value="Male">Male</option>
//                         <option value="Female">Female</option>
//                         <option value="Other">Other</option>
//                     </select>
//                 </div>
//                 <div className="mb-3 mt-3 input-group">
//                     <label htmlFor="address" className="mb-3">Address</label>
//                     <input type="text" id="address" className="input-group" placeholder="Address" value={address}
//                         onChange={(e) => setAddress(e.target.value)} />
//                 </div>
//                 {renderRoleSpecificFields()}
//                 <center>
//                     <button className="btn btn-bd-primary" onClick={handleSubmit}>Update</button>
//                 </center>
//             </div>
//         </div>
//     );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function EditProfile() {
    const user = useSelector((state) => state.user); // Assuming the user object is stored in state.user
    const role = user.loginRole; // Extract the role from the user object
    const navigate = useNavigate();

    // Common fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState(null);

    // Role-specific fields
    const [batch, setBatch] = useState('');
    const [guardianName, setGuardianName] = useState('');
    const [guardianPhone, setGuardianPhone] = useState('');
    const [rollNo, setRollNo] = useState('');
    const [education, setEducation] = useState('');
    const [designation, setDesignation] = useState('');
    const [subjectId, setSubject] = useState(new Set());

    const subjects = [
        { subId: 1, subName: 'Maths' },
        { subId: 2, subName: 'Physics' },
        { subId: 3, subName: 'Chemistry' },
        { subId: 4, subName: 'Biology' }
    ];

    const designations = [
        'PROFESSOR', 'ASSISTANT_PROFESSOR', 'VISITING_FACULTY', 'LAB_FACULTY'
    ];

    const addSubject = (subId) => {
        setSubject(prev => new Set(prev).add(subId));
    };

    const handleSubmit = () => {
        const data = {
            name, email, password, phone, dob, gender, address, image
        };

        if (role === "STUDENT") {
            Object.assign(data, { batch, guardianName, guardianPhone, rollNo });
        } else if (role === "TEACHER") {
            Object.assign(data, { education, designation, subjects: Array.from(subjectId) });
        }

        // Send data to API or handle it as needed
        alert("Profile Updated!");
        navigate('/dashboard'); // Redirect after successful update
    };

    const renderRoleSpecificFields = () => {
        if (role === "STUDENT") {
            return (
                <>
                    <div className="form-row">
                        <div className="mb-3 mt-3 input-group">
                            <label htmlFor="batch">Batch</label>
                            <input type="text" id="batch" className="input-group" placeholder="Batch" value={batch} required
                                onChange={(e) => setBatch(e.target.value)} />
                        </div>
                        <div className="mb-3 mt-3 input-group">
                            <label htmlFor="guardianName">Guardian Name</label>
                            <input type="text" id="guardianName" className="input-group" placeholder="Guardian Name" value={guardianName} required
                                onChange={(e) => setGuardianName(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="mb-3 mt-3 input-group">
                            <label htmlFor="guardianPhone">Guardian Contact</label>
                            <input type="text" id="guardianPhone" className="input-group" placeholder="Guardian Contact" value={guardianPhone} required
                                onChange={(e) => setGuardianPhone(e.target.value)} />
                        </div>
                        <div className="mb-3 mt-3 input-group">
                            <label htmlFor="rollNo">Roll No</label>
                            <input type="text" id="rollNo" className="input-group" placeholder="Roll No" value={rollNo} required
                                onChange={(e) => setRollNo(e.target.value)} />
                        </div>
                    </div>
                </>
            );
        } else if (role === "TEACHER") {
            return (
                <>
                    <div className="form-row">
                        <div className="mb-3 mt-3 input-group">
                            <label htmlFor="education">Education</label>
                            <input type="text" id="education" className="input-group" placeholder="Education" value={education} required
                                onChange={(e) => setEducation(e.target.value)} />
                        </div>
                        <div className="mb-3 mt-3 input-group">
                            <label htmlFor="designation">Designation</label>
                            <div className="input-group">
                                <select id="designation" className="input-group" value={designation} required onChange={(e) => setDesignation(e.target.value)}>
                                    <option value="">Select Designation</option>
                                    {designations.map((desig) => (
                                        <option key={desig} value={desig}>{desig}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12 mb-3 ">

                            <label htmlFor="subjects" className="input-group"><strong>Subjects</strong></label>
                            <div id="subjects" className="" style={{ border: '1px solid rgba(0, 2, 4, 0.207)', borderRadius: '20px', padding: '20px' }}>
                                {subjects.map((sub) => (
                                    <div key={sub.subId} className="form-check">
                                        <input type="checkbox" id={`subject-${sub.subId}`} value={sub.subId} onChange={(e) => addSubject(Number(e.target.value))} />
                                        <label htmlFor={`subject-${sub.subId}`} className="form-check-label ms-2">{sub.subName}</label>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </>
            );
        }
        return null;
    };

    return (
        <div className="container col-md-8" style={{ border: '1px solid rgba(0, 2, 4, 0.207)', borderRadius: '20px', padding: '20px' }}>
            <div className="mt-3 mb-5">
                <div className="heading" >
                    {role === "ADMIN" ? <h3>Admin Edit Profile</h3>
                        : (role === "TEACHER" ? <h3 >Teacher Edit Profile</h3> : <h3>Student Edit Profile</h3>)}
                </div>
                <div className="form-row">
                    <div className="mb-3 mt-3 input-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" className="input-group" placeholder="Name" value={name} required
                            onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3 mt-3 input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" className="input-group" placeholder="Email" value={email} required
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="mb-3 mt-3 input-group">
                        <label htmlFor="phone">Phone No</label>
                        <input type="text" id="phone" className="input-group" placeholder="Phone No" value={phone} required
                            onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className="mb-3 mt-3 input-group">
                        <label htmlFor="dob">Date of Birth</label>
                        <input type="date" id="dob" className="input-group" placeholder="Date of Birth" value={dob} required
                            onChange={(e) => setDob(e.target.value)} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="mb-3 mt-3 input-group">
                        <label htmlFor="gender">Gender</label>
                       <div className="input-group">
                       <select id="gender" className="input-group" value={gender} required onChange={(e) => setGender(e.target.value)}>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                       </div>
                    </div>
                    <div className="mb-3 mt-3 input-group">
                        <label htmlFor="address">Address</label>
                        <input type="text" id="address" className="input-group" required placeholder="Address" value={address}
                            onChange={(e) => setAddress(e.target.value)} />
                    </div>
                </div>
                {renderRoleSpecificFields()}
                <div className="form-row">
                    <div className="mb-3 mt-3 input-group">
                        <label htmlFor="image">Profile Image <span style={{ fontSize: `smaller`, fontStyle: `italic` }}>(.jpg , .png , .jpeg)</span></label>
                        <input type="file" id="image" className="input-group" required onChange={(e) => setImage(e.target.files[0])} placeholder="(.jpg,.png,.jpeg)" />
                    </div>
                </div>
                <center>
                    <button className="btn btn-bd-primary mt-3" onClick={handleSubmit}>Update</button>
                </center>
            </div>
        </div>
    );
}
