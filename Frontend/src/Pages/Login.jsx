import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAction } from "../Features/UserSlice";
import { Link, useNavigate } from "react-router-dom";
import userSignIn from '../Images/User.png'
import { toast } from 'react-toastify'
import { login } from "../Services/user";
import { getProfileById } from "../Services/user";
import { loginImage } from "../Features/ImageSlice";



export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [profileImage, setProfileImage] = useState('');



    const dispatch = useDispatch()
    const navigate = useNavigate()
    const OnLogin = async (event) => {

        event.preventDefault();

        if (email.length === 0 && password.length === 0) {
            toast.warning("Enter credentials")
        }
        if (email.length === 0)
            toast.warning("Enter Email")
        else if (password.length === 0)
            toast.warning("Enter password")
        else if (role.length === 0) {
            toast.warning("Select role")
        }
        else {

            try {
                const result = await login(email, password, role);
                console.log("i try" + result)
                const { loginId, loginName, loginRole, batchId, batchName, loginEmail } = result;

                const imgResult = await getProfileById(loginId);

                const { image } = imgResult
                console.log("image : " + image)

                // const base64Image = Buffer.from(imgResult, 'binary').toString('base64');
                // const imageSrc = `data:image/jpeg;base64,${base64Image}`; // Adjust the MIME type (image/jpeg) if necessary

                // const base64 = btoa(
                //     new Uint8Array(image).reduce(
                //         (data, byte) => data + String.fromCharCode(byte),''
                //     )
                // );
                setProfileImage(`data:image/jpg;base64,${image}`);
                // const userImage = profileImage
                console.log("in login page image : " + profileImage)
                console.log()
                if (image != null){
                    dispatch(loginImage({ userImage: `data:image/jpg;base64,${image}` }))
                    sessionStorage.setItem('userImage',`data:image/jpg;base64,${image}`)
                }
                 
                else{
                    dispatch(loginImage({ userImage: userSignIn }))
                    sessionStorage.setItem('userImage',userSignIn)

                }

                dispatch(loginAction({ loginId, loginName, loginRole, batchId, batchName, loginEmail }))
                navigate('/dashBoard')
            } catch (error) {
                // console.log("in catch"+result)
                toast.error(error)
            }

        }
    };




    return (
        <center>
            <div class="login-container" style={{ maxWidth: '500px', }}>
                <div class="row g-0">
                    <div >
                        <div className="login-form col-xs-12" style={{ borderRadius: '20px' }}>
                            <div align='center'>
                                <img className="shadow" src={userSignIn} style={{ borderRadius: '50%' }}></img>
                            </div>
                            <form style={{ height: '100%', width: '100%' }}>
                                <div className="input-group">
                                    <label>Email address</label>
                                    <input type="email" placeholder="Enter your email" value={email} required
                                        onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="input-group">
                                    <label>Password</label>
                                    <input type="password" placeholder="Enter your password" value={password} required
                                        onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="input-group">
                                    <label for="formGroupExampleInput2" class="" >Role</label><br />
                                    <div className="input-group">
                                        <select required
                                            className="form-control"
                                            id="roleSelect"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                        >
                                            <option value="">Select Role</option>
                                            <option value="ADMIN">ADMIN</option>
                                            <option value="TEACHER">TEACHER</option>
                                            <option value="STUDENT">STUDENT</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="remember-me" >
                                    <input type="checkbox" id="remember" />
                                    <label htmlFor="remember">Remember me</label>

                                </div>
                                <button type="submit" className="signin-btn" onClick={OnLogin}>Sign in</button>
                                <br />
                                <Link to="/RegisterStudent" style={{ float: 'left' }}>register here</Link>
                                <Link to="/forgotPassword" className="" style={{ float: 'right' }}>Forgot password?</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </center>

    );
}