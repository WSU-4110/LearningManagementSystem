import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { DATA_SERVER_URL } from '../../constants';
import http from '../../http';
import '../../css/assignment.css';

function SubmissionPeak(props) {
    return (
        <div className="SubmissionPeakContainer">
            <h2>{props.filePath}</h2>
            <a href={"http://localhost:5050/" + props.filePath} target="_blank" rel="noopener noreferrer">
                Open file
            </a>
            <div>
                <p> comment: </p>
                <input type="text"></input>
                <p> grade: </p>
                <input type="text"></input>
                <button>submit</button>
            </div>
        </div>
    );
}

export default function InstructorAssignment() {
    const { assignment_id } = useParams();
    const [assignment, setAssignment] = useState();
    const [submissions, setSubmissions] = useState([]);
    useEffect(() => {
        async function initialize() {
            // get assignment
            let response = await http.get(DATA_SERVER_URL + '/assignments/' + assignment_id);
            let assignment_obj = response.data.assignment;
            setAssignment(assignment_obj);

            // get submissions
            let sub_array = []
            for (let i = 0; i < assignment_obj.submissions.length; ++i) {
                response = await http.get(DATA_SERVER_URL + "/submissions/" + assignment_obj.submissions[i]);
                if (response === null) {
                    console.log("submission id doesnt have submission object associated with it");
                    continue;
                }
                let sub = response.data.submission;
                sub_array.push(sub);
            }
            setSubmissions(sub_array);
        }
        initialize();
    }, []);



    async function handleSubmit() {
        console.log('thank you for your submission *shredder sounds*');

        // create new submission
        let submission = {

        }
        http.post(DATA_SERVER_URL, + "/submissions/", { submission: submission });

        // attach the new submission to the assignment

    }

    return (
        <div className="container">
            <h2>{assignment && assignment.name}</h2>
            <p>{assignment && assignment.dueDate}</p>
            <p>{assignment && assignment.content}</p>
            <p>max points: {assignment && assignment.max_points}</p>

            <h1>Submissions:</h1>
            {submissions.map(sub => (
            <SubmissionPeak
                filePath={sub.filePath}
                key={sub._id}
            />
            ))}
        </div>
    );
}

