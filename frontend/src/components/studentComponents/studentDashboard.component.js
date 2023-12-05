import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {DATA_SERVER_URL} from '../../constants';
import http from '../../http';
import '../../css/dashboard.css';

function CoursePeak(props) {
    return (
        <div className="course">
            <Link to={"/studentCourse/" + props.courseId}>
                <h2>{props.courseName}</h2>
            </Link>
        </div>
    );
};
export default function StudentDashboard() {
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        async function getCourses() {
            try {
                let response;
                // get student id from auth server:
                response = await http.get(DATA_SERVER_URL + "/students/_id");
                const student_id = response.data._id;
                // get student's courses
                let accumulator_course_list = [];
                response = await http.get(DATA_SERVER_URL + "/students/" + student_id);
                let student = response.data.student;
                let course_ids = student.courses;
                for (let i = 0; i < course_ids.length; ++i) {
                    response = await http.get(DATA_SERVER_URL + "/courses/" + course_ids[i]);
                    let course = response.data.course;
                    accumulator_course_list.push(course);
                }
                setCourses(accumulator_course_list);
            } catch(err) {
                console.log('error: ' + err);
            }
        }
        getCourses();
    }, []);
    return ( 
        <div className="course-container">
            <h1 id="title">Courses:</h1>
            {courses.map(course => (
            <CoursePeak
                courseName={course.name}
                courseId={course._id}
                key={course._id}
            />
            ))}
        </div>
    );
};