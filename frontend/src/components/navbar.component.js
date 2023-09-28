import { Link } from 'react-router-dom';
export default function Navbar() {
    return (
        <nav>
            <Link to="/">lms</Link>
            <div>
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