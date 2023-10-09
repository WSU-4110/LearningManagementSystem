import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
export default function Course() {
    const { id } = useParams();
    return(
        <div>
            <p>this is course {id}</p>
            <Link to="/assignment">assignment</Link>
        </div>
    );
}