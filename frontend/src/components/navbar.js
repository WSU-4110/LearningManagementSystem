import { Link } from 'react-router-dom';

import '../css/nav.css';

let instance;

class Navbar {
  constructor() {
    if (instance) {
      throw new Error("New instance cannot be created!!");
    }

    instance = this;
  }

  getNavbar() {
    return (
        <nav className="navbar">
            <div className="nav-links">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/course">Course</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>                 
                    <li>
                        <Link to="/profilepage">Profile</Link>
                    </li> 
                </ul>
            </div>
        </nav>
    );
  }
}

let navbarInstance = Object.freeze(new Navbar());

export default navbarInstance;
