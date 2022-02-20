import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

const Register =({currentUser, setCurrentUser, setIsLoggedIn, token}) =>{
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [address, setAddress] = useState("");
    const [showCredentialsError, setShowCredentialsError] = useState(false);
    const [registerError, setRegisterError] = useState("");
    const navigate = useNavigate();

    const registerUser = () => {
        if ( !firstname || !lastname || !username || !email || !password || !confirmPassword || !address ) {
            return;
        }
        if (password !== confirmPassword) return;
        axios.post('/api/users/register', { firstname, lastname, username, email, password, address })
            .then(res => {   
                setCurrentUser(res.data.user);
                localStorage.setItem('token', res.data.token);
                setShowCredentialsError(false);
                setIsLoggedIn(true);
                navigate('/account');
            })
            .catch(error => {
                const errorMessage = "login" && "That username already exists. Please pick a different username."
                setRegisterError(errorMessage);
                setShowCredentialsError(true);
            })
    }

    const clearForm = () => {
        setFirstname("");
        setLastname("");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setAddress("");
    };

    return (
        <>  
            <div className='container'>
                <h1 className="pageHeader">Create Account</h1>
                <form className="createUserForm" onSubmit = {(event) => {
                    event.preventDefault();
                    registerUser();
                    clearForm(); }}>
                    <div className="leftRegister">
                        <div>
                            First Name: <input type="text" placeholder="John" onChange={event => setFirstname(event.target.value)} value={firstname} required/>
                        </div>
                        <div>
                            Last Name: <input type="text" placeholder="Doe" onChange={event => setLastname(event.target.value)} value={lastname} required/>
                        </div>
                        <div>
                            Email: <input type="email" placeholder="JohnDoe@email.com" onChange={event => setEmail(event.target.value)} value={email} required/>
                        </div>
                        <div>
                            Address: <input type="text" placeholder="123 John Street" onChange={event => setAddress(event.target.value)} value={address} />
                        </div>
                    </div>
                    <div className="rightRegister">
                        <div>
                            Username: <input type="text" placeholder="JohnDoe1" minLength="8" onChange={event => setUsername(event.target.value)} value={username} requiredrequired/>
                        </div>
                        <div>
                            Password: <input type="password" placeholder="JohnsPassword" minLength="8" onChange={event => setPassword(event.target.value)} value={password} />
                        </div>
                        <div>
                            Confirm Password: <input type="password" placeholder="JohnsPassword" minLength="8" onChange={event => setConfirmPassword(event.target.value)} value={confirmPassword} required/>
                        </div>
                        { password !== confirmPassword && <div>Passwords do not match</div>}
                        { showCredentialsError ? <div className="error">{registerError}</div> : null }
                        <button type="submit" className="submit"> Submit </button> 
                    </div>
                </form>
            </div>
                                        
        </>
    )
}

export default Register;