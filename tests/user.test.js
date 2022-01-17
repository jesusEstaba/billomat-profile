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

function AssertBadRequestOnCreationField(title, field, body) {
    it(`${title} ${field} field`, async () => {
        // when
        const res = await request(app).post('/api/v1/users').send(body);

        // then
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual(`Invalid value: ${field}`);
    });
}

function AssertBadRequestOnUpdateField(title, field, body) {
    it(`${title} ${field} field`, async () => {
        // when
        const res = await request(app).put('/api/v1/users/000000000000000000000001').send(body);

        // then
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual(`Invalid value: ${field}`);
    });
}

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
            name: 'Joe Doe',
            age: 22,
            bio: 'A very special guy',
            image: 'http://profile-billomat.s3.amazonaws.com/joe_doe_image_profile.png',
        };

        // when
        const res = await request(app).post('/api/v1/users').send(body);

        // then
        expect(res.statusCode).toEqual(201);
        expect(userSpy).toHaveBeenCalledWith(body);
    });

    AssertBadRequestOnCreationField('empty', 'name', {
        name: '',
        age: 22,
        bio: 'A very special guy',
        image: 'http://profile-billomat.s3.amazonaws.com/joe_doe_image_profile.png',
    });

    AssertBadRequestOnCreationField('empty', 'bio', {
        name: 'Joe Doe',
        age: 22,
        bio: '',
        image: 'http://profile-billomat.s3.amazonaws.com/joe_doe_image_profile.png',
    });

    AssertBadRequestOnCreationField('empty', 'image', {
        name: 'Joe Doe',
        age: 22,
        bio: 'A very special guy',
        image: '',
    });

    AssertBadRequestOnCreationField('empty', 'age', {
        name: 'Joe Doe',
        age: '',
        bio: 'A very special guy',
        image: 'http://profile-billomat.s3.amazonaws.com/joe_doe_image_profile.png',
    });

    AssertBadRequestOnCreationField('missing', 'name', {
        age: 22,
        bio: 'A very special guy',
        image: 'http://profile-billomat.s3.amazonaws.com/joe_doe_image_profile.png',
    });

    AssertBadRequestOnCreationField('missing', 'age', {
        name: 'Joe Doe',
        bio: 'A very special guy',
        image: 'http://profile-billomat.s3.amazonaws.com/joe_doe_image_profile.png',
    });

    AssertBadRequestOnCreationField('missing', 'bio', {
        name: 'Joe Doe',
        age: 22,
        image: 'http://profile-billomat.s3.amazonaws.com/joe_doe_image_profile.png',
    });

    AssertBadRequestOnCreationField('missing', 'image', {
        name: 'Joe Doe',
        age: 22,
        bio: 'A very special guy',
    });

    AssertBadRequestOnCreationField('invalid', 'image', {
        name: 'Joe Doe',
        age: 22,
        bio: 'A very special guy',
        image: 'undefined',
    });

    AssertBadRequestOnCreationField('invalid', 'age', {
        name: 'Joe Doe',
        age: 'undefined',
        bio: 'A very special guy',
        image: 'http://profile-billomat.s3.amazonaws.com/joe_doe_image_profile.png',
    });

    AssertBadRequestOnCreationField('invalid', 'age', {
        name: 'Joe Doe',
        age: -22,
        bio: 'A very special guy',
        image: 'http://profile-billomat.s3.amazonaws.com/joe_doe_image_profile.png',
    });
});

describe('Update user', () => {
    it('should update user by id successfully', async () => {
        // given
        const userSpy = jest.spyOn(UserRepository, 'findOrNull');
        userSpy.mockReturnValue(dummyUser);

        const updateSpy = jest.spyOn(UserRepository, 'update').mockImplementation(() => {});
        const body = {
            name: 'Joe Doe',
            age: 22,
            bio: 'A very special guy',
            image: 'http://profile-billomat.s3.amazonaws.com/joe_doe_image_profile.png',
        };

        // when
        const res = await request(app).put('/api/v1/users/000000000000000000000001').send(body);

        // then
        expect(res.statusCode).toEqual(204);
        expect(updateSpy).toHaveBeenCalled();
    });

    it('should update user by id successfully with empty body', async () => {
        // given
        const userSpy = jest.spyOn(UserRepository, 'findOrNull');
        userSpy.mockReturnValue(dummyUser);

        const updateSpy = jest.spyOn(UserRepository, 'update').mockImplementation(() => {});

        // when
        const res = await request(app).put('/api/v1/users/000000000000000000000001').send({});

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

    AssertBadRequestOnUpdateField('empty', 'name', { name: '' });
    AssertBadRequestOnUpdateField('empty', 'age', { age: '' });
    AssertBadRequestOnUpdateField('empty', 'bio', { bio: '' });
    AssertBadRequestOnUpdateField('empty', 'image', { image: '' });

    AssertBadRequestOnUpdateField('invalid', 'age', { age: 'undefined' });
    AssertBadRequestOnUpdateField('invalid', 'age', { age: -22 });
    AssertBadRequestOnUpdateField('invalid', 'image', { image: 'undefined' });
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
