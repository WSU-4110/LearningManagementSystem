import React, { useState } from 'react';
import axios from 'axios';
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
        axios.post('http://localhost:5050/students/add', student)
            .catch((err) => console.log(err));
        window.location = '/signin';
    };
    
    return (
        <div>
            <h1>Register</h1>
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
                <div>
                    <input
                        type="text"
                        placeholder="First Name"

                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Last Name"
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