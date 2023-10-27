import '../css/login.css';
import { useNavigate} from 'react-router-dom';
import React, { useState } from 'react';
import http from '../http';
export default function Login() {
    //const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    function handleSignin() {
        const student = {
            email: email,
            password: password
        };
        http.post('http://localhost:4000/login', student)
            .then(res => {
                if (res.data) {
                    const accessToken = res.data.accessToken;
                    const refreshToken = res.data.refreshToken;
                    localStorage.setItem("accessToken", accessToken);
                    localStorage.setItem("refreshToken", refreshToken);
                    console.log('valid password');
                    navigate('/dashboard');
                } else {
                    alert('Invalid password');
                }
            })
            .catch(err => { console.log(err) });
    };
    return (
        <div>
        <h1>Login</h1>
            <form>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>   
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="button" onClick={handleSignin}>
                Login
                </button>
            </form>
        </div>
    );
};
