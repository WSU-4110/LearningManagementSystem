import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
function CoursePeak(course) {
    return (
        <h1>{Object.values(course)}</h1>
    );
};
function ihatejs(obj) {
    console.log(`${obj} is of type: ${typeof(obj)}`);
    if (typeof(obj) === 'object') {
        console.log(`${obj} has keys: ${Object.keys(obj)}`);
        for (let i = 0; i < Object.keys(obj).length; i++) {
            console.log(`going into key: ${Object.keys(obj)[i]}`);
            ihatejs(obj[Object.keys(obj)[i]]);
        }
    }
}
export default function Dashboard() {
    const { id } = useParams();
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5050/students/getCourses/' + id)
            .then(courses => {
                setCourses(["str1", "str2"]);
                ihatejs(courses.data);
            })
            .catch(err => { console.log('error: ' + err) });
    }, []);
    return courses.map(course => {
        return <CoursePeak course={course} key={course}/>;
    });
};