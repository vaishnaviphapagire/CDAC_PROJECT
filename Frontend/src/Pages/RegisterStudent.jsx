import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import { registerStudent } from "../Services/user";
import { getAllBatches } from "../Services/batch";
import { useEffect } from "react";
export default function RegisterStudent({ isOpen }) {



  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [batchId, setBatchId] = useState('');
  const [batches, setbatches] = useState([]);

  const navigate = useNavigate();

  const OnRegister = async (event) => {
    event.preventDefault();
    if (email.length === 0 && password.length === 0) {
      alert("Enter credentials")
    }
    if (email.length === 0)
      alert("Enter Email")
    else if (password.length === 0)
      alert("Enter password")
    else if (name.length === 0) {
      alert("Enter name")
    } else if (phone.length === 0) {
      alert("Enter Phone no")
    } else if (gender.length === 0) {
      alert("Enter gender")
    } else if (batchId === 0) {
      alert("Enter batch")
    }
    else {
      //Call the UserLogin Api
      // const { loginId, loginName, loginRole, batchId, batchName } = response.data;

      //dispatch(loginAction({loginId, loginName, loginRole, batchId, batchName }))

      try{

        const result = await registerStudent(
          email,
          password,
          name,
          phone,
          gender,
          "STUDENT",
          batchId,
        )
        toast.success("Registered Successfullly..!")
        navigate('/')

        

      }catch(error){
        toast.error(error.response['data']) 
      }

      




     
     
    }



    // API call to register the user
    //   fetch('http://your-server-url/api/register', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(body),
    //   })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log('Registration successful:', data);
    //     alert("User Registration Completed!");
    //     navigate('/Login');
    //   })
    //   .catch((error) => {
    //     console.error('Error during registration:', error);
    //     alert("Registration failed, please try again.");
    //   });
  };


  const OnLogin = () => {
    navigate("/")
  }

  const getBatches = async () => {
    const result = await getAllBatches();
    setbatches(result)
    console.log(result)
  }

  useEffect(() => {
    getBatches()
  }, [])
  // if (!isOpen ) return null
  //  else
  return (
    <center>
      <div className="login-container" style={{ maxWidth: '500px' }}>
        <div className="row g-0">
          <div className="col-xs-12 login-form">
            <center>
              <h1 style={{ color: '#073a70' }}>Student Registration</h1>
            </center>
            <form style={{ marginTop: '20px' }}>
              <div className="input-group">
                <label style={{ color: 'white' }}>Name:</label>
                <input type="text" className="" placeholder="Name" required
                  value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="input-group">
                <label style={{ color: 'white' }}>Password:</label>
                <input type="password" className="" placeholder="Password" required
                  value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="input-group">
                <label style={{ color: 'white' }}>Email address:</label>
                <input type="email" className="" placeholder="Enter email" required
                  value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="input-group">
                <label style={{ color: 'white' }}>Phone Number:</label>
                <input type="tel" className="" placeholder="Phone Number" required
                  value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className="input-group">
                <label style={{ color: 'white' }}>Gender:</label>
                <div className="input-group">
                  <select className="form-control" required
                    value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>
              <div className="input-group">
                <label style={{ color: 'white' }}>Batch:</label>
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
              <div>
                <button type="button" className="btn btn-bd-primary " onClick={OnRegister}>Register</button>

                <button type="button" className="btn btn-bd-primary ms-5" onClick={OnLogin}>Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </center>
  );
}
