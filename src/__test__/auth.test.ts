import request from 'supertest';
import app from '../app';
import { connectDB, closeDB } from './db/testDatabase';

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await closeDB();
});

describe('Auth API Tests', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/create-user')
      .send({
        email: 'test@example.com',
        password: 'Unique4004@',
      });

    // Log response body for debugging
    console.log('Register Response:', res.body);

    // Ensure proper error handling in the test
    if (res.statusCode !== 201) {
      console.error('Error registering user:', res.body);
    }

    expect(res.statusCode).toBe(201);

  });

  it('should login the user and return a token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'Unique4004@',
      });

    // Log response body for debugging
    console.log('Login Response:', res.body);

    if (res.statusCode !== 200) {
      console.error('Error logging in:', res.body);
    }

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
