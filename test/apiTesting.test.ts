import request, { Response } from 'supertest';
import { IUsers } from '../src/types/serverControllersTypes';
import { server } from '../src/server/server';
import http from 'http';

let app: http.Server;

const createInitUser = async (): Promise<{ postResponse: Response; payload: IUsers }> => {
  const payload = { username: 'john', age: 20, hobbies: ['programming', 'soccer'] };
  const postResponse = await request(app)
    .post('/api/users')
    .send(payload)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');

  return { postResponse, payload };
};

describe('Api testing', () => {
  beforeAll((done) => {
    app = server.listen(4000, done);
  });

  afterAll((done) => {
    app.close(done);
  });

  it('should return an empty array when there are no users by Get', async () => {
    const getResponse = await request(app).get('/api/users');

    expect(getResponse.statusCode).toBe(200);
    expect(getResponse.body).toEqual([]);
  });

  it('should return current user by Get', async () => {
    const { postResponse, payload } = await createInitUser();
    const createdUserId = postResponse.body.id;
    const getResponse = await request(app).get(`/api/users/${createdUserId}`);

    expect(getResponse.statusCode).toBe(200);
    expect(getResponse.body).toMatchObject({
      id: createdUserId,
      username: payload.username,
      age: payload.age,
      hobbies: payload.hobbies,
    });
  });

  it('should return a new object by a Post', async () => {
    const { postResponse, payload } = await createInitUser();

    expect(postResponse.statusCode).toBe(201);
    expect(postResponse.body).toHaveProperty('id');
    expect(postResponse.body).toMatchObject({
      username: payload.username,
      age: payload.age,
      hobbies: payload.hobbies,
    });
  });

  it('should update info about user by Put', async () => {
    const { postResponse, payload } = await createInitUser();
    const payloadPut = { username: 'iZeevens', age: 19 };
    const createdUserId = postResponse.body.id;
    const putResponse = await request(app)
      .put(`/api/users/${createdUserId}`)
      .send(payloadPut)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    expect(putResponse.statusCode).toBe(200);
    expect(putResponse.body).toMatchObject({ ...payload, ...payloadPut });
  });

  it('should delete user by Delete', async () => {
    const { postResponse } = await createInitUser();
    const createdUserId = postResponse.body.id;

    const deleteResponse = await request(app).delete(`/api/users/${createdUserId}`);
    expect(deleteResponse.statusCode).toBe(204);
    expect(deleteResponse.body).toEqual('');
  });
});
