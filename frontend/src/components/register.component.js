import { useState } from 'react';
import {AUTH_SERVER_URL} from '../constants';
import http from '../http';
import '../css/Register.css';


export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    function handleRegister() {
        const student = {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        };
        http.post(AUTH_SERVER_URL, student)
            .catch((err) => console.log(err));
        window.location = '/login';
    };
    
    return (
        <div className="container">
            <h1>Register</h1>
            <form>
                <div className="register_email">
                    <p>Email Address</p>
                    <i className="fas fa-user"></i>
                    <input
                        type="email"
                        placeholder="Email"
                        className="inputfield"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="register_password">
                    <p>Password</p>
                    <i className="fas fa-lock"></i>
                    <input
                        type="password"
                        placeholder="Password"
                        className="inputfield"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="register_firstname">
                    <p>First Name</p>
                    <i className="fas fa-arrow-right"></i>
                    <input
                        type="text"
                        placeholder="First Name"
                        className="inputfield"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="register_lastname">
                    <p>Last Name</p>
                    <i className="fas fa-arrow-right"></i>
                    <input
                        type="text"
                        placeholder="Last Name"
                        className="inputfield"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <button type="button" onClick={handleRegister}>
                    Register
                </button>
            </form>
        </div>
    );
};