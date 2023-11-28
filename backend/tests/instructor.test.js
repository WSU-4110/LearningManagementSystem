const request = require('supertest');
const data_server = require('../server')(5003);

let test_instructor_id;

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
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('message', 'instructor created');
        test_instructor_id = response.body.id;
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
    });

    // UPDATE
    it('update an instructor', async () => {
        const response = await request(data_server)
            .patch('/instructors/')
            .send({
                id: test_instructor_id,
                instructor: {
                    email: "test@NEWemail.com",
                    password: "skibidi",
                    firstName: "john",
                    lastName: "wayne",
                    courses: ["6562eb9b156f809cccf086ce"]
                }
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'instructor updated');
    });
    
    // DELETE
    it('delete an instructor', async () => {
        const response = await request(data_server)
            .delete('/instructors/')
            .send({
                id: test_instructor_id
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'instructor deleted');
    });
});
