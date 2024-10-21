import request, { Response } from 'supertest';
import { IUsers } from '../src/types/serverControllersTypes';
import { server } from '../src/server/server';

const createInitUser = async (): Promise<{ postResponse: Response; payload: IUsers }> => {
  const payload = { username: 'john', age: 20, hobbies: ['programming', 'soccer'] };
  const postResponse = await request(server)
    .post('/api/users')
    .send(payload)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');

  return { postResponse, payload };
};

describe('Api testing', () => {
  afterAll((done) => {
    server.close(done);
  });

  it('should return an empty array when there are no users by Get', async () => {
    const response = await request(server).get('/api/users');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should return current user by Get', async () => {
    const { postResponse, payload } = await createInitUser();
    const createdUserId = postResponse.body.id;
    const getResponse = await request(server).get(`/api/users/${createdUserId}`);

    expect(getResponse.statusCode).toBe(200);
    expect(getResponse.body).toMatchObject({
      id: createdUserId,
      username: payload.username,
      age: payload.age,
      hobbies: payload.hobbies,
    });
  });

  it('should reutrn an new object by a Post', async () => {
    const { postResponse, payload } = await createInitUser();

    expect(postResponse.statusCode).toBe(200);
    expect(postResponse.body).toHaveProperty('id');
    expect(postResponse.body).toMatchObject({
      username: payload.username,
      age: payload.age,
      hobbies: payload.hobbies,
    });
  });

  it('Should update info about user by Put', async () => {
    const { postResponse, payload } = await createInitUser();
    const payloadPut = { username: 'iZeevens', age: 19 };
    const createdUserId = postResponse.body.id;
    const getResponse = await request(server)
      .put(`/api/users/${createdUserId}`)
      .send(payloadPut)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    expect(getResponse.statusCode).toBe(200);
    expect(getResponse.body).toMatchObject({ ...payload, ...payloadPut });
  });
});
