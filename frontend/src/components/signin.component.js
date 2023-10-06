import React, { useState } from 'react';
import axios from 'axios'
import '../Signin.css';
export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    function handleSignin() {
        const student = {
            email: email,
            password: password
        };
        axios.post('http://localhost:5050/students/signin', student)
            .then(res => {
                if (res.data) {
                    console.log('valid password');
                    window.location = '/dashboard';
                } else {
                    console.log('invalid password');
                }
            })
            .catch(err => { console.log(err) });
    };
    return (
        <div>
        <h1>Sign In</h1>
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
                <button type="button" onClick={handleSignin}>
                Sign In
                </button>
            </form>
        </div>
    );
};
