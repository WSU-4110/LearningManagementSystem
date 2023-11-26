import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {DATA_SERVER_URL} from '../constants';
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
                let response;
                let accumulator_assignment_list = [];
                // get the course this component represents
                response = await http.get(DATA_SERVER_URL + "/courses/" + id);
                let course = response.data.course;
                let assignment_ids = course.assignments;
                for (let i = 0; i < assignment_ids.length; ++i) {
                    response = await http.get(DATA_SERVER_URL + "/assignments/" + assignment_ids[i]);
                    let assignment = response.data.assignment;
                    accumulator_assignment_list.push(assignment);
                }
                setAssignments(accumulator_assignment_list);
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