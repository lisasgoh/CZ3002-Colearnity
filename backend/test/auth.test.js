/* eslint-disable no-console */
/* eslint-disable no-undef */
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const request = supertest(app);

const Users = require('../models/Users');

const USER_A = {
  username: 'testuser01',
  email: 'test@gmail.com',
  password: '123456',
  is_student: 'true',
};

const USER_A_DUP_EMAIL = {
  username: 'testuser02',
  email: 'test@gmail.com',
  password: '123456',
  is_student: 'true',
};

const USER_A_DUP_USERNAME = {
  username: 'testuser01',
  email: 'test2@gmail.com',
  password: '123456',
  is_student: 'true',
};

const USER_NO_EMAIL = {
  username: 'testuser01',
  password: '123456',
  is_student: 'true',
};

const USER_NO_PASSWORD = {
  username: 'testuser01',
  email: 'test@gmail.com',
  is_student: 'true',
};

const USER_B = {
  user: {
    email: 'test@gmail.com',
    password: '123456',
  },
};

const USER_B_NO_EMAIL = {
  user: {
    password: '123456',
  },
};

const USER_B_NO_PASSWORD = {
  user: {
    email: 'test@gmail.com',
  },
};

const USER_B_WRONG_EMAIL = {
  user: {
    email: 'test123@gmail.com',
    password: '123456',
  },
};

const USER_B_WRONG_PASSWORD = {
  user: {
    email: 'test@gmail.com',
    password: '1234567',
  },
};

const USER_LOGIN_WRONG_FORMAT = {};

afterAll(async () => {
  await Users.remove({});
  mongoose.connection.close();
});

describe('create user', () => {
  it('creates user successfully', async (done) => {
    const response = await request
      .post('/api/users')
      .send(USER_A);
    const { user } = response.body;
    console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(user).toHaveProperty('token');
    expect(user.email).toBe(USER_A.email);
    done();
  });
  it('creates user unsuccessfully - no email', async (done) => {
    const response = await request
      .post('/api/users')
      .send(USER_NO_EMAIL);
    expect(response.statusCode).toBe(400); // test error msg?
    done();
  });
  it('creates user unsuccessfully - no password', async (done) => {
    const response = await request
      .post('/api/users')
      .send(USER_NO_PASSWORD);
    expect(response.statusCode).toBe(400); // test error msg?
    done();
  });
  it('creates user unsuccessfully - duplicate email', async (done) => {
    const response = await request
      .post('/api/users')
      .send(USER_A_DUP_EMAIL);
    expect(response.statusCode).toBe(400); // test error msg?
    done();
  });
  it('creates user unsuccessfully - duplicate username', async (done) => {
    const response = await request
      .post('/api/users')
      .send(USER_A_DUP_USERNAME);
    expect(response.statusCode).toBe(400);
    done();
  });
});

describe('login', () => {
  it('login - successful', async (done) => {
    const response = await request
      .post('/api/users/login')
      .send(USER_B);
    expect(response.statusCode).toBe(200);
    const { user } = response.body;
    expect(user).toHaveProperty('token');
    expect(user.email).toBe(USER_A.email);
    done();
  });
  it('login - no email', async (done) => {
    const response = await request
      .post('/api/users/login')
      .send(USER_B_NO_EMAIL);
    expect(response.statusCode).toBe(400);
    done();
  });
  it('login - no password', async (done) => {
    const response = await request
      .post('/api/users/login')
      .send(USER_B_NO_PASSWORD);
    expect(response.statusCode).toBe(400);
    done();
  });
  it('login - wrong email', async (done) => {
    const response = await request
      .post('/api/users/login')
      .send(USER_B_WRONG_EMAIL);
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({ error: 'authentication failed' });
    done();
  });
  it('login - wrong password', async (done) => {
    const response = await request
      .post('/api/users/login')
      .send(USER_B_WRONG_PASSWORD);
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({ error: 'authentication failed' });
    done();
  });
  it('login - wrong data', async (done) => {
    const response = await request
      .post('/api/users/login')
      .send(USER_LOGIN_WRONG_FORMAT);
    expect(response.statusCode).toBe(403);
    done();
  });
});
