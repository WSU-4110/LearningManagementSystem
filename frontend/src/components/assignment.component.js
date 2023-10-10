import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
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
    return (
        <div>
            <h2>{assignment && assignment.name}</h2>
            <p>{assignment && assignment.dueDate}</p>
            <p>{assignment && assignment.content}</p>
        </div>
    );
}