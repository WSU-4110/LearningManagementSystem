import { useState, useEffect, Component } from 'react';
import { Link } from 'react-router-dom';
import http from '../http';

class CoursePeak extends Component {
    render()
    {
    return (
        <div>
            <Link to={"/course/" + props.courseID}>
                <h2>{props.courseName}</h2>
            </Link>
        </div>
    );
};
}

class Dashboard extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            courses: [],
        }
    };
}

        async getCourses() {
            try {
                let courseList = [];
                const rawCourses = await http.get('http://localhost:5050/students/getCourses/');
                const courseIds = Object.values(rawCourses.data);
                for (let i = 0; i < courseIds.length; i++) {
                    const course = await http.get('http://localhost:5050/courses/' + courseIds[i]);
                    courseList.push(course.data);
                }
                this.setState({courses: courseList });
            } catch(err) {
                console.log('error: ' + err);
            }
        }
        render()
        {
            return this.state.course.map(course => {
                return <CoursePeak courseName={course.name} courseId={course._id} key={course._id}/>;
    }, []);

    };
