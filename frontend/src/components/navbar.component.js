import { Link } from 'react-router-dom';

import '../nav.css';

const Navbar = () => {
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
                        <Link to="/signin">Sign-In</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
