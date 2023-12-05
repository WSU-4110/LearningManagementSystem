const request = require('supertest');
const data_server = require('../server')(5002);

let test_course_id;

// afterAll(() => {
//     data_server.stopServer();
// });

let test_course;

describe('CRUD data_server/courses/', () => {
    // CREATE
    it('create a new course', async () => {
        const response = await request(data_server)
            .post('/courses/')
            .send({
                course: {
                    name: "test course",
                    students: [],
                    assignments: []
                }
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('message', 'course created');
        // save course id for the get test
        test_course_id = response.body._id;
    });

    // READ
    it('read a course', async () => {
        const response = await request(data_server)
            .get(`/courses/${test_course_id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'course read');
        expect(response.body).toHaveProperty('course');
        expect(response.body).toHaveProperty('course.name', 'test course');
        // save course object for patch test
        test_course = response.body.course;
    });

    // UPDATE
    it('update a course', async () => {
        test_course.name = "updated test course name";
        const response = await request(data_server)
            .patch('/courses/')
            .send({
                course: test_course
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'course updated');
    });
    
    // DELETE
    it('delete a course', async () => {
        const response = await request(data_server)
            .delete('/courses/')
            .send({
                _id: test_course_id
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'course deleted');
    });
});
