import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
function AssignmentPeak(props) {
    return (
        <div>
            <Link to={"/assignment/" + props.assignmentId}>
                <h2>{props.assignmentName}</h2>
            </Link>
        </div>
    );
};
export default function Course() {
    const { id } = useParams();
    const [assignments, setAssignments] = useState([]);
    useEffect(() => {
        async function getAssignments() {
            try {
                const course = await axios.get('http://localhost:5050/courses/' + id);
                setAssignments(course.data.assignments);
            } catch(err) {
                console.log('error: ' + err);
            }
        }
        getAssignments();
    }, []);
    return assignments.map(assignment => {
        return <AssignmentPeak assignmentName={assignment.name} assignmentId={assignment._id} key={assignment._id}/>;
    });
}