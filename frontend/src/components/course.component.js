import { Link } from 'react-router-dom';
export default function Course() {
    return(
        <div>
            <p>this is a course</p>
            <Link to="/assignment">assignment</Link>
        </div>
    );
}