import React, { useState } from 'react';
import axios from 'axios';
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
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <button type="button" onClick={handleRegister}>
                    register
                </button>
            </form>
        </div>
    );
};