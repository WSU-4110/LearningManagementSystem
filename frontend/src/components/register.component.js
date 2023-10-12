import React, { useState } from 'react';
import axios from 'axios';
export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    function handleRegister() {
        const student = {
            email: email,
            password: password
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
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="button" onClick={handleRegister}>
                    register
                </button>
            </form>
        </div>
    );
};