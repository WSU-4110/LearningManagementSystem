import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {DATA_SERVER_URL} from '../constants';
import http from '../http';
import '../css/assignment.css';

export default function Assignment() {
    const {assignment_id} = useParams();
    const [assignment, setAssignment] = useState();
    useEffect(() => {
        async function getAssignment() {
            let response = await http.get( DATA_SERVER_URL + '/assignments/' + assignment_id);
            setAssignment(response.data.assignment);
        }
        getAssignment();
    }, []);
    function handleSubmit() {
        console.log('thank you for your submission *shredder sounds*');
    }
    return (
        <div>
            <h2>{assignment && assignment.name}</h2>
            <p>{assignment && assignment.dueDate}</p>
            <p>{assignment && assignment.content}</p>
            <form>
                <input type="file"/>
                <div>
                    <button className="small-btn" type="button" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}