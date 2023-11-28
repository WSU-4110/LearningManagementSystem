const request = require('supertest');
const data_server = require('../server')(5001);

let test_assignment_id;

// afterAll(() => {
//     data_server.stopServer();
// });

describe('CRUD data_server/assignments/', () => {
    // CREATE
    it('create a new assignment', async () => {
        const response = await request(data_server)
            .post('/assignments/')
            .send({
                assignment: {
                    name: 'test assignment',
                    dueDate: '1944-06-06T06:30:00.000Z',
                    content: 'test content'
                }
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('message', 'assignment created');
        test_assignment_id = response.body.id;
    });

    // READ
    it('read an assignment', async () => {
        const response = await request(data_server)
            .get(`/assignments/${test_assignment_id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'assignment read');
        expect(response.body).toHaveProperty('assignment');
        expect(response.body).toHaveProperty('assignment.name', 'test assignment');
        expect(response.body).toHaveProperty('assignment.dueDate', '1944-06-06T06:30:00.000Z');
        expect(response.body).toHaveProperty('assignment.content', 'test content');
    });

    // UPDATE
    it('update an assignment', async () => {
        const response = await request(data_server)
            .patch('/assignments/')
            .send({
                id: test_assignment_id,
                assignment: {
                    name: 'test assignment with an updated name wow',
                    dueDate: '1944-06-06T06:30:00.000Z',
                    content: 'test content'
                }
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'assignment updated');
    });
    
    // DELETE
    it('delete an assignment', async () => {
        const response = await request(data_server)
            .delete('/assignments/')
            .send({
                id: test_assignment_id
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'assignment deleted');
    });
});
