const request = require('supertest');
const data_server = require('../server')(5002);

let test_course_id;

// afterAll(() => {
//     data_server.stopServer();
// });

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
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('message', 'course created');
        test_course_id = response.body.id;
    });

    // READ
    it('read a course', async () => {
        const response = await request(data_server)
            .get(`/courses/${test_course_id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'course read');
        expect(response.body).toHaveProperty('course');
        expect(response.body).toHaveProperty('course.name', 'test course');
    });

    // UPDATE
    it('update a course', async () => {
        const response = await request(data_server)
            .patch('/courses/')
            .send({
                id: test_course_id,
                course: {
                    name: 'test course with an updated name wow',
                    students: ["6562eb9b156f809cccf086ce"],
                    assignments: []
                }
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'course updated');
    });
    
    // DELETE
    it('delete a course', async () => {
        const response = await request(data_server)
            .delete('/courses/')
            .send({
                id: test_course_id
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'course deleted');
    });
});
