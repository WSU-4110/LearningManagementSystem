class LearningManagementSystem {
    constructor() {
      this.students = [];
      this.courses = [];
      this.enrollments = [];
    }
  
    addStudent(studentName) {
      const student = { name: studentName, id: this.students.length + 1 };
      this.students.push(student);
      console.log(`${studentName} has been added to the system.`);
      return student;
    }
  
    addCourse(courseName) {
      const course = { name: courseName, id: this.courses.length + 1 };
      this.courses.push(course);
      console.log(`Course "${courseName}" has been added to the system.`);
      return course;
    }
  
    enrollStudent(studentId, courseId) {
      const student = this.students.find(student => student.id === studentId);
      const course = this.courses.find(course => course.id === courseId);
  
      if (student && course) {
        const enrollment = { student, course };
        this.enrollments.push(enrollment);
        console.log(`${student.name} has been enrolled in the course "${course.name}".`);
        return enrollment;
      } else {
        console.error('Student or course not found. Enrollment failed.');
      }
    }
  
    getEnrolledStudents(courseId) {
      const enrolledStudents = this.enrollments
        .filter(enrollment => enrollment.course.id === courseId)
        .map(enrollment => enrollment.student.name);
  
      console.log(`Students enrolled in the course: ${enrolledStudents.join(', ')}`);
      return enrolledStudents;
    }
  
    getStudentEnrollments(studentId) {
      const studentEnrollments = this.enrollments
        .filter(enrollment => enrollment.student.id === studentId)
        .map(enrollment => enrollment.course.name);
  
      console.log(`Courses enrolled by the student: ${studentEnrollments.join(', ')}`);
      return studentEnrollments;
    }
  
    removeStudent(studentId) {
      const index = this.students.findIndex(student => student.id === studentId);
      if (index !== -1) {
        const removedStudent = this.students.splice(index, 1)[0];
        console.log(`${removedStudent.name} has been removed from the system.`);
      } else {
        console.error('Student not found. Removal failed.');
      }
    }
  }
module.exports = LearningManagementSystem;
  