import request from 'supertest';
import { server } from '../src/server/server';

describe('Api testing', () => {
  afterAll((done) => {
    server.close(done);
  });

  it('should return an empty array when there are no users by Get', async () => {
    const response = await request(server).get('/api/users');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should reutrn an new object by a Post', async () => {
    const payload = { username: 'john', age: 20, hobbies: ['programming', 'soccer'] };
    const response = await request(server)
      .post('/api/users')
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toMatchObject({
      username: payload.username,
      age: payload.age,
      hobbies: payload.hobbies,
    });
  });
});
