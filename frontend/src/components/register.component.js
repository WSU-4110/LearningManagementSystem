import React, { useState } from 'react';
import axios from 'axios';
import '../css/Register.css';


export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');

    function handleInputChange(e) {
        // Clear the error message when the user changes their input
        setError('');

        // Handle input changes based on the input name
        switch (e.target.name) {
            case 'email':
                setEmail(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            case 'firstName':
                setFirstName(e.target.value);
                break;
            case 'lastName':
                setLastName(e.target.value);
                break;
            default:
                break;
        }
    }

    function handleRegister() {

        // Simple email validation
        if (!email) {
            // If email is empty, set an error message
            setError('Email field is empty');
            return;
        } else if (email.indexOf('@') === -1) {
            // If email does not contain '@', set an error message
            setError('Invalid email address: add @');
            return;
        }

        // Simple password validation
        if (!password) {
            // If password is empty, set an error message
            setError('Password field is empty');
            return;
        } else if ((password.indexOf(' ') === -1) &&
            (password.indexOf('!') === -1) && 
            (password.indexOf('"') === -1) && 
            (password.indexOf('#') === -1) && 
            (password.indexOf('$') === -1) && 
            (password.indexOf('%') === -1) && 
            (password.indexOf('&') === -1) && 
            (password.indexOf('\'') === -1) && 
            (password.indexOf('(') === -1) && 
            (password.indexOf(')') === -1) && 
            (password.indexOf('*') === -1) && 
            (password.indexOf('+') === -1) && 
            (password.indexOf(',') === -1) && 
            (password.indexOf('-') === -1) && 
            (password.indexOf('.') === -1) && 
            (password.indexOf('/') === -1) && 
            (password.indexOf(':') === -1) && 
            (password.indexOf(';') === -1) && 
            (password.indexOf('<') === -1) && 
            (password.indexOf('=') === -1) && 
            (password.indexOf('>') === -1) && 
            (password.indexOf('?') === -1) && 
            (password.indexOf('@') === -1) && 
            (password.indexOf('[') === -1) && 
            (password.indexOf('\\') === -1) && 
            (password.indexOf(']') === -1) && 
            (password.indexOf('^') === -1) && 
            (password.indexOf('_') === -1) && 
            (password.indexOf('`') === -1) && 
            (password.indexOf('{') === -1) && 
            (password.indexOf('|') === -1) && 
            (password.indexOf('}') === -1) && 
            (password.indexOf('~') === -1)) {
            // If password doesn't have a special character, set an error message
            setError('Add a special character to password');
            return;
        }

        // Simple first name validation
        if (!firstName) {
            // If firstName is empty, set an error message
            setError('First Name field is empty');
            return;
        }

        // Simple last name validation
        if (!lastName) {
            // If lastName is empty, set an error message
            setError('Last Name field is empty');
            return;
        }
        
        const student = {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        };
        axios.post('http://localhost:4000/', student)
            .then(() => {
                // Redirect to login after successful registration
                window.location = '/login';
            })
            .catch((err) => {
                // Handle API errors
                setError('Registration failed. Please try again.');
                console.log(err);
            });
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
                        name="email"
                        placeholder="Email"
                        className="inputfield"
                        value={email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="register_password">
                    <p>Password</p>
                    <i className="fas fa-lock"></i>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="inputfield"
                        value={password}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="register_firstname">
                    <p>First Name</p>
                    <i className="fas fa-arrow-right"></i>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        className="inputfield"
                        value={firstName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="register_lastname">
                    <p>Last Name</p>
                    <i className="fas fa-arrow-right"></i>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        className="inputfield"
                        value={lastName}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="button" onClick={handleRegister}>
                    Register
                </button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};