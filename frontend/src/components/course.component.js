import { Link } from 'react-router-dom';
import React, {useState, useEffect} from 'react'
export default function Course() {

    {/*courseTextDisplay is used to change the font for the header "Courses"*/}
    const courseTextDisplay = 
    {
        color: '#F67280',
        textDecoration: 'underline',
    };

    const [courses, setCourses] = useState([]);

    useEffect(() => 
    {
        fetch('/courses')
        .then((response) => response.json())
        .then((data) => setCourses(data))
    });
    
    return(
        <div>
            <h1 style={courseTextDisplay}>Courses</h1>
            <ul>

            {/*To be continued by Rei to print actual students courses*/}
            {courses.map((course) => 
                (
                    <li key={course._id}>{course.name}</li>
                ))}
                <li><Link to="/course">course1</Link></li>
                <li><Link to="/course">course2</Link></li>
                <li><Link to="/course">course3</Link></li>
            </ul>
            <Link to="/assignment">assignment</Link>
        </div>
    );
}