const LearningManagementSystem = require('./learningManagementSystem');

describe('LearningManagementSystem', () => {
  let lms;

  beforeEach(() => {
    lms = new LearningManagementSystem();
  });

  test('addStudent method', () => {
    const student = lms.addStudent('John Doe');
    expect(student.name).toBe('John Doe');
    expect(lms.students.length).toBe(1);
  });

  test('addCourse method', () => {
    const course = lms.addCourse('Introduction to JavaScript');
    expect(course.name).toBe('Introduction to JavaScript');
    expect(lms.courses.length).toBe(1);
  });

  test('enrollStudent method', () => {
    const student = lms.addStudent('John Doe');
    const course = lms.addCourse('Introduction to JavaScript');
    const enrollment = lms.enrollStudent(student.id, course.id);
    
    expect(enrollment.student).toBe(student);
    expect(enrollment.course).toBe(course);
    expect(lms.enrollments.length).toBe(1);
  });

  test('getEnrolledStudents method', () => {
    const student = lms.addStudent('John Doe');
    const course = lms.addCourse('Introduction to JavaScript');
    lms.enrollStudent(student.id, course.id);
    
    const enrolledStudents = lms.getEnrolledStudents(course.id);
    expect(enrolledStudents).toEqual(['John Doe']);
  });

  test('getStudentEnrollments method', () => {
    const student = lms.addStudent('John Doe');
    const course = lms.addCourse('Introduction to JavaScript');
    lms.enrollStudent(student.id, course.id);
    
    const studentEnrollments = lms.getStudentEnrollments(student.id);
    expect(studentEnrollments).toEqual(['Introduction to JavaScript']);
  });

  test('removeStudent method', () => {
    const student = lms.addStudent('John Doe');
    lms.removeStudent(student.id);
    
    expect(lms.students.length).toBe(0);
  });
});
