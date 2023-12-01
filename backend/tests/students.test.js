const request = require('supertest');
const data_server = require('../server')(5004);

let test_student_id;

// afterAll(() => {
//     data_server.stopServer();
// });

let test_student;

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
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('message', 'student created');
        // save test student id for get test
        test_student_id = response.body._id;
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
        // save test student object for patch test
        test_student = response.body.student;
    });

    // UPDATE
    it('update a student', async () => {
        test_student.email = "doofus@gmail.com";
        const response = await request(data_server)
            .patch('/students/')
            .send({
                student: test_student
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'student updated');
    });
    
    // DELETE
    it('delete a student', async () => {
        const response = await request(data_server)
            .delete('/students/')
            .send({
                _id: test_student_id
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'student deleted');
    });
});
