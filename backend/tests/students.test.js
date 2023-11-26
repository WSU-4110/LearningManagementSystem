const request = require('supertest');
const data_server = require('../server')(5003);

let test_student_id;

// afterAll(() => {
//     data_server.stopServer();
// });

describe('CRUD data_server/students/', () => {
    // CREATE
    it('create a new student', async () => {
        const response = await request(data_server)
            .post('/students/')
            .send({
                student: {
                    email: "test@email.com",
                    password: "skibidi",
                    firstName: "john",
                    lastName: "cena",
                    courses: []
                }
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('message', 'student created');
        test_student_id = response.body.id;
    });

    // READ
    it('read a student', async () => {
        const response = await request(data_server)
            .get(`/students/${test_student_id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'student read');
        expect(response.body).toHaveProperty('student');
        expect(response.body).toHaveProperty('student.email', 'test@email.com');
        expect(response.body).toHaveProperty('student.password', 'skibidi');
        expect(response.body).toHaveProperty('student.firstName', 'john');
        expect(response.body).toHaveProperty('student.lastName', 'cena');
        expect(response.body).toHaveProperty('student.courses', []);
    });

    // UPDATE
    it('update a student', async () => {
        const response = await request(data_server)
            .patch('/students/')
            .send({
                id: test_student_id,
                student: {
                    email: "test@NEWemail.com",
                    password: "skibidi",
                    firstName: "john",
                    lastName: "wayne",
                    courses: ["6562eb9b156f809cccf086ce"]
                }
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'student updated');
    });
    
    // DELETE
    it('delete a student', async () => {
        const response = await request(data_server)
            .delete('/students/')
            .send({
                id: test_student_id
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'student deleted');
    });
});
