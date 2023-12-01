const request = require('supertest');
const data_server = require('../server')(5003);

let test_instructor_id;

let test_instructor;

describe('CRUD data_server/instructors/', () => {
    // CREATE
    it('create a new instructor', async () => {
        const response = await request(data_server)
            .post('/instructors/')
            .send({
                instructor: {
                    email: "test@email.com",
                    password: "skibidi",
                    firstName: "john",
                    lastName: "cena",
                    courses: []
                }
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('message', 'instructor created');
        // save test instructor id for get test
        test_instructor_id = response.body._id;
    });

    // READ
    it('read a instructor', async () => {
        const response = await request(data_server)
            .get(`/instructors/${test_instructor_id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'instructor read');
        expect(response.body).toHaveProperty('instructor');
        expect(response.body).toHaveProperty('instructor.email', 'test@email.com');
        expect(response.body).toHaveProperty('instructor.password', 'skibidi');
        expect(response.body).toHaveProperty('instructor.firstName', 'john');
        expect(response.body).toHaveProperty('instructor.lastName', 'cena');
        expect(response.body).toHaveProperty('instructor.courses', []);
        // save test instructor object for patch test
        test_instructor = response.body.instructor;
    });

    // UPDATE
    it('update an instructor', async () => {
        test_instructor.firstName = "funny updated name";
        const response = await request(data_server)
            .patch('/instructors/')
            .send({
                instructor: test_instructor
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'instructor updated');
    });
    
    // DELETE
    it('delete an instructor', async () => {
        const response = await request(data_server)
            .delete('/instructors/')
            .send({
                _id: test_instructor_id
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'instructor deleted');
    });
});
