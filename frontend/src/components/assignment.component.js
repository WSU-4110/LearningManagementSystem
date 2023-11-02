import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/assignment.css';

export default function Assignment() {
    const { id } = useParams();
    const [assignment, setAssignment] = useState();
    useEffect(() => {
        async function getAssignment() {
            const rawAssignment = await axios.get('http://localhost:5050/assignments/' + id);
            setAssignment(rawAssignment.data);
        }
        getAssignment();
    }, []);
    function handleSubmit() {
        console.log('thank you for your submission');
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