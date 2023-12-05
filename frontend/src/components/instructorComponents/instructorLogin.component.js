import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {AUTH_SERVER_URL} from '../../constants';
import http from '../../http';
import '../../css/login.css';

export default function InstructorLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [roleCall, setRollCall] = useState('');
    const navigate = useNavigate();
    
    function handleLogin() {
        const instructor = {
            email: email,
            password: password
        };
        http.post(AUTH_SERVER_URL + '/instructorLogin', instructor)
            .then(res => {
                if (res.data) {
                    const accessToken = res.data.accessToken;
                    const refreshToken = res.data.refreshToken;
                    localStorage.setItem("accessToken", accessToken);
                    localStorage.setItem("refreshToken", refreshToken);
                    localStorage.setItem("roleCall", 1);
                    setRollCall();
                    console.log('valid password');
                    navigate('/instructorDashboard'); // INSTRUCTOR DASH
                } else {
                    alert('Invalid password');
                }
            })
            .catch(err => { console.log(err) });
    };
    
    return (
        <div className="container">
        <h1>Login</h1>
            <form>
                <div className="login_username">
                    <p>Username</p>
                    <i className="fas fa-user"></i>
                    <input
                        type="email"
                        placeholder="Type your username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="login_input"
                    />
                </div>
                <div className="login_password">   
                    <p>Password</p>
                    <i className="fas fa-lock"></i>
                    <input
                        type="password"
                        placeholder="Type your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="password_input"
                    />
                </div>
                <button type="button" onClick={handleLogin}>
                    Log In
                </button>
                <button type="button" onClick={() => {navigate("/instructorRegister")}}>
                    Register
                </button>                
            </form>
        </div>
    );
};
