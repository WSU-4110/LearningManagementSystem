import '../Signin.css';

import React, { useState } from 'react';



function Signin() 
{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = () => 
  {
    console.log('Signing in with email:', email);
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
