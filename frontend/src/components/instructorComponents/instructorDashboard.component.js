import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {DATA_SERVER_URL} from '../../constants';
import http from '../../http';
function CoursePeak(props) {
    return (
        <div>
            <Link to={"/instructorCourse/" + props.courseId}>
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
                // get instructor id from auth server:
                response = await http.get(DATA_SERVER_URL + "/instructors/_id");
                const instructor_id = response.data._id;
                // get instructor's courses
                let accumulator_course_list = [];
                response = await http.get(DATA_SERVER_URL + "/instructors/" + instructor_id);
                let instructor = response.data.instructor;
                let course_ids = instructor.courses;
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
    return courses.map(course => {
        return <CoursePeak courseName={course.name} courseId={course._id} key={course._id}/>;
    });
};