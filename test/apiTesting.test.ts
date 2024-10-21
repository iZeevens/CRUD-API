import request from 'supertest';
import { server } from '../src/server/server';

describe('Api testing', () => {
  afterAll((done) => {
    server.close(done);
  });

  it('should return an empty array when there are no users', async () => {
    const response = await request(server).get('/api/users');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
});
