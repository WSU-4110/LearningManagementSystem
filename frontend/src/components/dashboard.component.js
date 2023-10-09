import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
function CoursePeak(props) {
    return (
        <div>
            <Link to={"/course/" + props.courseId}><h2>{props.courseName}</h2></Link>
        </div>
    );
};
export default function Dashboard() {
    const { id } = useParams();
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        async function getCourses() {
            try {
                let courseList = [];
                const rawCourses = await axios.get('http://localhost:5050/students/getCourses/' + id);
                const courseIds = Object.values(rawCourses.data);
                for (let i = 0; i < courseIds.length; i++) {
                    const course = await axios.get('http://localhost:5050/courses/' + courseIds[i]);
                    courseList.push(course.data);
                }
                setCourses(courseList);
            } catch(err) {
                console.log('error: ' + err);
            }
        }
        getCourses();
    }, []);
    return courses.map(course => {
        return <CoursePeak courseName={course.name} courseId={course._id} key={course._id}/>;
    });
};