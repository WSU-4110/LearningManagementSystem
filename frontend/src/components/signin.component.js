import '../css/Signin.css';
import React, { useState } from 'react';
import axios from 'axios';
export default function Signin() {
    const navigate = useNavigate();
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
                    navigate('/dashboard:' + res.data);

                    window.location = `/dashboard/${res.data}`;
                } else {
                    alert('Invalid password'); // make visible
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
