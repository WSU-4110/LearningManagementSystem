import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {AUTH_SERVER_URL} from '../../constants';
import http from '../../http';
import '../../css/login.css';

export default function InstructorLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    
    function handleTogglePassword() {
        setShowPassword(!showPassword);
    }


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
                    <div className="container-password">
                        <i className="fas fa-lock"></i>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Type your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="password_input"
                        />
                        <i
                            className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                            onClick={handleTogglePassword}
                        ></i>
                    </div>
                </div>
                <div className="container-button">
                    <button type="button" onClick={handleLogin}>
                        Log In
                    </button>
                    <button type="button" onClick={() => {navigate("/studentRegister")}}>
                        Register
                    </button>
                </div>                  
            </form>
        </div>
    );
};
