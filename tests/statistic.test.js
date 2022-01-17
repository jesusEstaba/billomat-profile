const request = require('supertest');
const { app } = require('../src/server');
const UserRepository = require('../src/repositories/UserRepository');

describe('Get users statistics', () => {
    it('should get average age', async () => {
        // given
        const userSpy = jest.spyOn(UserRepository, 'getAverageAge');
        userSpy.mockReturnValue(23.45);

        // when
        const res = await request(app).get('/api/v1/statistics/avg');

        // then
        expect(res.statusCode).toEqual(200);
        expect(res.body.average_age).toEqual(23.45);
    });
});
