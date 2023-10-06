import '../Signin.css';
import axios from 'axios'

import React, { useState } from 'react';



function Signin() 
{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = () => 
  {
    console.log('Signing in with email:', email);
    const student = {
      email: email,
      password: password
    };
    axios.post('http://localhost:5050/students/add', student)
      .catch((err) => console.log(err));
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
}

export default Signin;