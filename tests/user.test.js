const request = require('supertest');
const { app } = require('../src/server');

describe('Get all users', () => {
    it('should get all users', async () => {
        const res = await request(app).get('/api/v1/users');

        expect(res.statusCode).toEqual(200);
    });
});

describe('Find user', () => {
    it('should get single user by id', async () => {
        const res = await request(app).get('/api/v1/users/PI31416');

        expect(res.statusCode).toEqual(200);
    });
});

describe('Create user', () => {
    it('should create user successfully', async () => {
        const res = await request(app).post('/api/v1/users');

        expect(res.statusCode).toEqual(201);
    });
});

describe('Update user', () => {
    it('should update user by id successfully', async () => {
        const res = await request(app).put('/api/v1/users/PI31416');

        expect(res.statusCode).toEqual(204);
    });
});

describe('Delete user', () => {
    it('should delete user by id successfully', async () => {
        const res = await request(app).delete('/api/v1/users/PI31416');

        expect(res.statusCode).toEqual(204);
    });
});
