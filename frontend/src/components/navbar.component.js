import { Link } from 'react-router-dom';
export default function Navbar() {
    return (
        <nav>
            <Link to="/">lms</Link>
            <div>
                <ul>
                    <li>
                        <Link to="/">home</Link>
                    </li>
                    <li>
                        <Link to="/course">course</Link>
                    </li>
                    <li>
                    <Link to="/signin">signin</Link>

                    </li>
                </ul>
            </div>
        </nav>
    );
}