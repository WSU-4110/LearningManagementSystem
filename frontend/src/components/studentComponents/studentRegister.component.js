import { useState } from 'react';
import {AUTH_SERVER_URL} from '../../constants';
import http from '../../http';
import '../../css/Register.css';

// there should really be 2 registers, one for student one for instructor

export default function StudentRegister() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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
    //Allows user to see password
    function handleTogglePassword() {
        setShowPassword(!showPassword);
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

        // Password validation
        if (!password) {
            // If password is empty, set an error message
            setError('Password field is empty');
            return;
        } else if (password.length < 8) {
            // If password is less than 8 characters long, set an error message
            setError('Password must be >=8 characters');
            return;
        } else if ((password.indexOf('a') === -1) &&
            (password.indexOf('b') === -1) && 
            (password.indexOf('c') === -1) && 
            (password.indexOf('d') === -1) && 
            (password.indexOf('e') === -1) && 
            (password.indexOf('f') === -1) && 
            (password.indexOf('g') === -1) && 
            (password.indexOf('h') === -1) && 
            (password.indexOf('i') === -1) && 
            (password.indexOf('j') === -1) && 
            (password.indexOf('k') === -1) && 
            (password.indexOf('l') === -1) && 
            (password.indexOf('m') === -1) && 
            (password.indexOf('n') === -1) && 
            (password.indexOf('o') === -1) && 
            (password.indexOf('p') === -1) && 
            (password.indexOf('q') === -1) && 
            (password.indexOf('r') === -1) && 
            (password.indexOf('s') === -1) && 
            (password.indexOf('t') === -1) && 
            (password.indexOf('u') === -1) && 
            (password.indexOf('v') === -1) && 
            (password.indexOf('w') === -1) && 
            (password.indexOf('x') === -1) && 
            (password.indexOf('y') === -1) && 
            (password.indexOf('z') === -1)) {
            // If password doesn't have a lowercase letter, set an error message
            setError('Add a lowercase letter to password');
            return;
        } else if ((password.indexOf('A') === -1) &&
            (password.indexOf('B') === -1) && 
            (password.indexOf('C') === -1) && 
            (password.indexOf('D') === -1) && 
            (password.indexOf('E') === -1) && 
            (password.indexOf('F') === -1) && 
            (password.indexOf('G') === -1) && 
            (password.indexOf('H') === -1) && 
            (password.indexOf('I') === -1) && 
            (password.indexOf('J') === -1) && 
            (password.indexOf('K') === -1) && 
            (password.indexOf('L') === -1) && 
            (password.indexOf('M') === -1) && 
            (password.indexOf('N') === -1) && 
            (password.indexOf('O') === -1) && 
            (password.indexOf('P') === -1) && 
            (password.indexOf('Q') === -1) && 
            (password.indexOf('R') === -1) && 
            (password.indexOf('S') === -1) && 
            (password.indexOf('T') === -1) && 
            (password.indexOf('U') === -1) && 
            (password.indexOf('V') === -1) && 
            (password.indexOf('W') === -1) && 
            (password.indexOf('X') === -1) && 
            (password.indexOf('Y') === -1) && 
            (password.indexOf('Z') === -1)) {
            // If password doesn't have an uppercase letter, set an error message
            setError('Add an uppercase letter to password');
            return;
        } else if ((password.indexOf('0') === -1) &&
            (password.indexOf('1') === -1) && 
            (password.indexOf('2') === -1) && 
            (password.indexOf('3') === -1) && 
            (password.indexOf('4') === -1) && 
            (password.indexOf('5') === -1) && 
            (password.indexOf('6') === -1) && 
            (password.indexOf('7') === -1) && 
            (password.indexOf('8') === -1) && 
            (password.indexOf('9') === -1)) {
            // If password doesn't have a number, set an error message
            setError('Add a number to password');
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
            lastName: lastName,
            courses: []
        };
        http.post(AUTH_SERVER_URL + '/student', student) // should be {student}
            .then(() => {
                // Redirect to login after successful registration
                window.location = '/studentLogin';
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
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Password"
                        className="inputfield"
                        value={password}
                        onChange={handleInputChange}
                    />
                <i
                        className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                        onClick={handleTogglePassword}
                ></i>
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