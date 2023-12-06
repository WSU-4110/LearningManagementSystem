import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {DATA_SERVER_URL} from '../../constants';
import http from '../../http';
import '../../css/instructorDash.css';
import '../../css/dashboard.css';

function CoursePeak(props) {
  return (
    <div className="CoursePeakContainer">
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
                // Get instructor id from auth server
                const response = await http.get(DATA_SERVER_URL + "/instructors/_id");
                const instructor_id = response.data._id;

                // Get instructor's courses
                const instructorResponse = await http.get(DATA_SERVER_URL + "/instructors/" + instructor_id);
                const instructor = instructorResponse.data.instructor;

                // Check if instructor and instructor.courses exist
                if (instructor && instructor.courses && Array.isArray(instructor.courses)) {
                    let accumulator_course_list = [];
                    for (let courseId of instructor.courses) {
                        const courseResponse = await http.get(DATA_SERVER_URL + "/courses/" + courseId);
                        const course = courseResponse.data.course;

                        // Check if course exists before pushing it to the list
                        if (course) {
                            accumulator_course_list.push(course);
                        }
                    }
                    setCourses(accumulator_course_list);
                } else {
                    // Handle the case where the instructor or courses data is not available
                    console.log("Instructor data or courses are not available");
                    setCourses([]);
                }
            } catch(err) {
                console.log('error: ' + err);
                setCourses([]); // Set to an empty array in case of an error
            }
        }
        getCourses();
    }, []);

    return (
      <>
        <h1>Courses:</h1>
        {courses.map(course => (
          <CoursePeak
            courseName={course.name}
            courseId={course._id}
            key={course._id}
          />
        ))}
      </>
    );
};
