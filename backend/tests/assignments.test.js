const request = require('supertest');
const data_server = require('../server');

let test_assignment_id;

describe('CRUD data_server/assignments/', () => {
    it('should create a new assignment', async () => {
        const response = await request(data_server)
            .post('/assignments/')
            .send({
                name: 'test course',
                dueDate: '1944-06-06T06:30:00.000Z',
                content: 'test content'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('message', 'assignment created');
        test_assignment_id = response.body.id;
    });

    it('should read an assignment', async () => {
        const response = await request(data_server)
            .get('/assignments/')
            .send({
                id: test_assignment_id
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'assignment read');
        expect(response.body).toHaveProperty('assignment');
        expect(response.body).toHaveProperty('assignment.name', 'test course');
        expect(response.body).toHaveProperty('assignment.dueDate', '1944-06-06T06:30:00.000Z');
        expect(response.body).toHaveProperty('assignment.content', 'test content');
    });

    it('should update an assignment', async () => {
        const response = await request(data_server)
            .patch('/assignments/')
            .send({
                id: test_assignment_id,
                assignment: {
                    name: 'test course with an updated name wow',
                    dueDate: '1944-06-06T06:30:00.000Z',
                    content: 'test content'
                }
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'assignment updated');
    });

    it('should delete an assignment', async () => {
        const response = await request(data_server)
            .delete('/assignments/')
            .send({
                id: test_assignment_id
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'assignment deleted');
    });
});
