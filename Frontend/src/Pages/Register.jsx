import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAction } from "../Features/UserSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { registerStudent } from "../Services/user";
import { registerTeacher } from "../Services/user";
import { getAllBatches } from "../Services/batch";
import { getSubjects } from "../Services/subject";
import { useEffect } from "react";

export default function Register() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [subjects, setSubjects] = useState(new Set())
    const [designation, setDesignation] = useState('')
    const [education, setEducation] = useState('')
    const [gender, setGender] = useState('');
    const [subjectList, setSubjectList] = useState([])

    const [batchId, setBatchId] = useState('');
    const [batches, setbatches] = useState([]);
    const location = useLocation();
    const navigate = useNavigate()

    const role = location.state?.role || '';



    const OnRegister = async (event) => {
        event.preventDefault();

        if (gender === null) {
            alert("select gender")
        }
        if (role === 'TEACHER') {
            if (subjects.size === 0) {
                alert("choose atleast one subjectId")
            }
            if (designation.length === 0) {
                alert("choose atleast one subjectId")
            }
            try {
                const subjectId = Array.from(subjects);
                const result = await registerTeacher(
                    email,
                    password,
                    name,
                    phone,
                    gender,
                    role,
                    designation,
                    education,
                    subjectId
                )
                alert("Teacher Registration Completed!");
                navigate('/dashboard')
            } catch (error) {
                alert(error)
            }


        } else {
            try {
                const result = await registerStudent(
                    email,
                    password,
                    name,
                    phone,
                    gender,
                    role,
                    batchId,
                )
                alert("Student Registration Completed!");
                navigate('/dashboard')
            } catch (error) {
                alert(error.response.data)
            }

        }
        //send input values to request body in register/add TEACHER/STUDENT api

    };


    const designations = [
        'PROFESSOR', 'ASSISTANT_PROFESSOR', 'VISITING_FACULTY', 'LAB_FACULTY'
    ]

    const addSubject = (newItem) => {
        setSubjects((prevItems) => new Set(prevItems).add(newItem));
    };

    // const [subjects, setSubjects] = useState([])
    const getAllSubjects = async () => {
        const result = await getSubjects();
        setSubjectList(result)

    }
    const getBatches = async () => {
        const result = await getAllBatches();
        setbatches(result)
        console.log(result)
    }

    useEffect(() => {
        getBatches()
        getAllSubjects();
    }, [])

    const getDesignations = () => {
        //from the backen get list of designation enum
        //setDesignations
    }

    const renderFormFields = () => {
        if (role === "TEACHER") {
            return (
                <>
                    <div className="mb-3 mt-3 input-group ">
                        <label htmlFor="studentId" className="mb-3">Education</label><br />
                        <input type="text" className="" placeholder="Enter education details... ',' separated"
                            onChange={(e) => setEducation(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label for="formGroupExampleInput2" >Designation</label><br />
                        <div className="input-group" >
                            <select name="" id="" required className="form-control "
                                onChange={(e) => setDesignation(e.target.value.toString())} >
                                <option value="" >Select Designation</option>
                                {designations.map((desig) => (
                                    <option name="designation" value={desig}> {desig}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="input-group mt-3" style={{ border: '1px solid rgba(0, 2, 4, 0.207)', borderRadius: '20px', padding: '20px' }}>
                        <label htmlFor="formGroupExampleInput2" className="mb-3">TEACHER Subjects</label>
                        {
                            subjectList.map((sub) => {
                                return (
                                    <div className="input-group" style={{ display: 'inline-flex' }}>
                                        <div>
                                            <input type="checkbox" name="subjects[]" value={sub.subId}
                                                onChange={(e) => addSubject(e.target.value)}></input>
                                        </div>
                                        <div className="ms-3">{sub.subName}</div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </>
            );
        }
        return (
            <div className="input-group">
                <label>Batch:</label>
                <div className="input-group">
                    <select className="form-control" required
                        onChange={(e) => setBatchId(e.target.value)}>
                        <option value="">Select Batch</option>
                        {
                            batches.map((b) => {
                                return <option value={b.id}>{b.batchName}</option>
                            })
                        }
                    </select>
                </div>
            </div>
        );
    };

    return (
        <div className="container col-md-8 " style={{ border: '1px solid rgba(0, 2, 4, 0.207)', borderRadius: '20px', padding: '20px' }} >
            <div className=" mt-3 mb-5" style={{ borderRadius: '10px' }}>
                <div className="heading">
                    {
                        role === "TEACHER" ? <h3>Teacher Registration Page</h3> : <h3>Student Registration Page</h3>
                    }
                </div>
                <div className="mt-3 input-group">
                    <label htmlFor="roleSelect" className="mb-1" style={{ fontSize: 'medium' }}>Role: {role}</label>
                </div>
                <div className="mb-3 mt-3 input-group">
                    <label htmlFor="formGroupExampleInput" className="mb-3">Name</label><br />
                    <input type="text" className="" placeholder="Name..." value={name} required
                        onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3 mt-3 input-group">
                    <label htmlFor="formGroupExampleInput" className="mb-3">Email</label><br />
                    <input type="email" className="" placeholder="Email..." value={email} required
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3 mt-3 input-group">
                    <label htmlFor="formGroupExampleInput2" className="mb-3">Phone No</label><br />
                    <input type="number" className="" placeholder="Contact no...." value={phone} required
                        onChange={(e) => setPhone((e.target.value).toString())} />
                </div>
                <div className="mb-3 mt-3 input-group">
                    <label htmlFor="formGroupExampleInput2" className="mb-3">Password</label><br />
                    <input type="password" className="" placeholder="Password..." value={password} required
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="input-group">
                    <label>Gender:</label>
                    <div className="input-group">
                        <select className="form-control" required
                            value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="">Select Gender</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            <option value="OTHERS">Other</option>
                        </select>
                    </div>
                </div>
                {renderFormFields()}
                <center>
                    <button className="btn btn-bd-primary" onClick={OnRegister}>Register</button>
                </center>
            </div>
        </div>
    );
}

