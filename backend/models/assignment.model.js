const mongoose = require('mongoose');
const assignmentSchema = mongoose.Schema({
    name: String,
    dueDate: Date,
    content: String
});
const Assignment = mongoose.model('Assignment', assignmentSchema);
module.exports = Assignment;


class AssignmentService {
    static instance = null;

    constructor() {
        if (!AssignmentService.instance) {
            AssignmentService.instance = this;
        }
        return AssignmentService.instance;
    }

    // Other methods...
}

export default new AssignmentService();


// CourseContainer.js
import React, { Component } from 'react';
import Course from './Course';
import AssignmentService from './AssignmentService';

class CourseContainer extends CourseComponent {
    constructor(props) {
        super(props);
        this.state = {
            assignments: [],
        };
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        AssignmentService.getAssignments(id)
            .then(assignmentList => {
                this.setState({ assignments: assignmentList });
            })
            .catch(err => {
                console.log('error: ' + err);
            });
    }

    render() {
        return <Course assignments={this.state.assignments} />;
    }
}

//export default CourseContainer;

// Course.js (Presentation Component)
import React from 'react';
import AssignmentPeak from './AssignmentPeak';

const Course = ({ assignments }) => (
    <div>
        {assignments.map(assignment => (
            <AssignmentPeak
                assignmentName={assignment.name}
                assignmentId={assignment._id}
                key={assignment._id}
            />
        ))}
    </div>
);

//export default Course;
