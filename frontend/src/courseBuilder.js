class Course {
    constructor() {
        this.name = "";
        this.courseCode = "";
        this.semester = "";
        this.startDate = "";
        this.endDate = "";
        this.students = [];
    }
}

class CourseBuilder {
    constructor() {}

    createCourse() {
        this.attributeSet = 0;
        this.course = new Course();
        // below are attributes of a Course
        this.name = "";
        this.courseCode = "";
        this.semester = "";
        this.startDate = "";
        this.endDate = "";
        this.students = [];
    }

    getCourse() {
        // at least 4 attributes of a Course need to be set
        // for it to be available for use
        if (this.attributeSet > 4) {
            return this.course;
        } else {
            console.log('Course has not been initialized yet');
            return null;
        }
    }

    setName(name) {this.name = name; this.attributeSet += 1;}
    setCourseCode(code) {this.courseCode = code; this.attributeSet += 1;}
    setSemester(sem) {this.semester = sem; this.attributeSet += 1;}
    setStartDate(date) {this.startDate = date; this.attributeSet += 1;}
    setEndDate(date) {this.endDate = date; this.attributeSet += 1;}
    setStudents(students) {this.setudents = students; this.attributeSet += 1;}
}