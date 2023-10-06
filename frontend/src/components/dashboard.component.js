import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
function CoursePeak(course) {
    return (
        <h1>{Object.values(course)}</h1>
    );
};
export default function Dashboard() {
    const { id } = useParams();
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5050/students/getCourses/' + id)
            .then(courses => {
                setCourses(courses.data);
            })
            .catch(err => { console.log('error: ' + err) });
    }, []);
    return courses.map(course => {
        return <CoursePeak course={course} key={course}/>;
    });
};