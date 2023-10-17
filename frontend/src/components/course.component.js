import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import http from '../http';
function AssignmentPeak(props) {
    return (
        <div>
            <Link to={"/assignment/" + props.assignmentId}>
                <h2>{props.assignmentName}</h2>
            </Link>
        </div>
    );
}
export default function Course() {
    const { id } = useParams();
    const [assignments, setAssignments] = useState([]);
    useEffect(() => {
        async function getAssignments() {
            try {
                let assignmentList = [];
                const response = await http.get('http://localhost:5050/courses/' + id);
                const course = response.data;
                const assignmentIds = course.assignments;
                for (let i = 0; i < Object.values(assignmentIds).length; i++) {
                    const assignment = await http.get('http://localhost:5050/assignments/' + assignmentIds[i]);
                    assignmentList.push(assignment.data);
                }
                setAssignments(assignmentList);
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