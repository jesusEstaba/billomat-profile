const request = require('supertest');
const { app } = require('../src/server');
const UserRepository = require('../src/repositories/UserRepository');

const dummyUser = {
    _id: '000000000000000000000001',
    name: 'Joe Doe',
    age: 22,
    bio: 'A very special guy',
    image: 'http://profile-billomat.s3.amazonaws.com/joe_doe_image_profile.png',
};

describe('Get all users', () => {
    it('should get all users', async () => {
        // given
        const userSpy = jest.spyOn(UserRepository, 'all');
        userSpy.mockReturnValue([dummyUser]);

        // when
        const res = await request(app).get('/api/v1/users');

        // then
        expect(res.statusCode).toEqual(200);
    });
});

describe('Find user', () => {
    it('should get single user by id', async () => {
        // given
        const userSpy = jest.spyOn(UserRepository, 'findOrNull');
        userSpy.mockReturnValue(dummyUser);

        // when
        const res = await request(app).get('/api/v1/users/000000000000000000000001');

        // then
        expect(res.statusCode).toEqual(200);
    });

    it('shouldnt retrive user', async () => {
        // given
        const userSpy = jest.spyOn(UserRepository, 'findOrNull');
        userSpy.mockReturnValue(null);

        // when
        const res = await request(app).get('/api/v1/users/404');

        // then
        expect(res.statusCode).toEqual(404);
    });
});

describe('Create user', () => {
    it('should create user successfully', async () => {
        // given
        const userSpy = jest.spyOn(UserRepository, 'save');
        userSpy.mockReturnValue(dummyUser);
        const body = {
            name: 'string',
            age: 0,
            bio: 'string',
            image: 'string',
        };

        // when
        const res = await request(app).post('/api/v1/users').send(body);

        // then
        expect(res.statusCode).toEqual(201);
        expect(userSpy).toHaveBeenCalledWith(body);
    });
});

describe('Update user', () => {
    it('should update user by id successfully', async () => {
        // given
        const userSpy = jest.spyOn(UserRepository, 'findOrNull');
        userSpy.mockReturnValue(dummyUser);

        const updateSpy = jest.spyOn(UserRepository, 'update').mockImplementation(() => {});

        // when
        const res = await request(app).put('/api/v1/users/000000000000000000000001');

        // then
        expect(res.statusCode).toEqual(204);
        expect(updateSpy).toHaveBeenCalled();
    });

    it('shouldnt retrive user', async () => {
        // given
        const userSpy = jest.spyOn(UserRepository, 'findOrNull');
        userSpy.mockReturnValue(null);

        // when
        const res = await request(app).put('/api/v1/users/404');

        // then
        expect(res.statusCode).toEqual(404);
    });
});

describe('Delete user', () => {
    it('should delete user by id successfully', async () => {
        // given
        const userSpy = jest.spyOn(UserRepository, 'findOrNull');
        userSpy.mockReturnValue(dummyUser);

        const removeSpy = jest.spyOn(UserRepository, 'remove').mockImplementation(() => {});

        // when
        const res = await request(app).delete('/api/v1/users/000000000000000000000001');

        // then
        expect(res.statusCode).toEqual(204);
        expect(removeSpy).toHaveBeenCalled();
    });

    it('shouldnt retrive user', async () => {
        // given
        const userSpy = jest.spyOn(UserRepository, 'findOrNull');
        userSpy.mockReturnValue(null);

        // when
        const res = await request(app).delete('/api/v1/users/404');

        // then
        expect(res.statusCode).toEqual(404);
    });
});
