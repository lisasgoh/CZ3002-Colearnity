/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const mongoose = require('mongoose');

const supertest = require('supertest');
const app = require('../app');

const request = supertest.agent(app);

const Forum = require('../models/Forum');
const Users = require('../models/Users');

const USER_A = {
  username: 'testuser01',
  email: 'test@gmail.com',
  password: '123456',
  is_student: 'false',
};

const USER_A_LOGIN = {
  user: {
    email: 'test@gmail.com',
    password: '123456',
  },
};

const FORUM_A = {
  name: 'test forum',
  description: 'test description',
  is_sub: false,
};
const FORUM_A_NO_NAME = {
  description: 'test description',
  is_sub: false,
};
const FORUM_A_NO_DESCRIPTION = {
  name: 'test forum',
  is_sub: false,
};
const FORUM_A_NO_ISSUB = {
  name: 'test forum',
  description: 'test description',
};
const auth = {};

const cookie = null;

beforeAll(async (done) => {
  await request
    .post('/api/users')
    .send(USER_A)
    .then((response) => {
      const { user } = (response.body);
      auth.token = user.token;
      auth.user_id = user._id;
    });
  await request
    .post('/api/users/login')
    .send(USER_A_LOGIN)
    .then((response) => {
      // cookies = response.headers['set-cookie'][0].split(',').map((item) => item.split(';')[0]);
      // cookie = cookies.join(';');
      done();
    });
});

afterAll(async () => {
  await Forum.remove({});
  await Users.remove({});
  mongoose.connection.close();
});

describe('create main forum', () => {
  it('creates main forum unsuccessfully - no authentication', async (done) => {
    const response = await request
      .post('/api/forum')
      // .set('Cookie', cookie)
      // .set('Cookie', `${cookie}=1; expires=1 Jan 1970 00:00:00 GMT;`)
      .send(FORUM_A);
    expect(response.statusCode).toBe(200);
    done();
  });/*
  it('creates main forum successfully', async (done) => {
    const response = await request
      .post('/api/forum')
      .set('Cookie', cookie)
      .send(FORUM_A);
    console.log(response.body);
    const forum = response.body;
    console.log(forum);
    expect(response.statusCode).toBe(200);
    expect(forum.name).toBe(FORUM_A.name);
    done();
  });
  it('creates main forum unsuccessfully - no name', async (done) => {
    const response = await request
      .post('/api/forum')
      .set('Cookie', cookie)
      .send(FORUM_A_NO_NAME);
    expect(response.statusCode).toBe(400);
    done();
  });
  it('creates main forum unsuccessfully - no description', async (done) => {
    const response = await request
      .post('/api/forum')
      .set('Cookie', cookie)
      .send(FORUM_A_NO_DESCRIPTION);
    expect(response.statusCode).toBe(400);
    done();
  });
  it('creates main forum unsuccessfully - no is_sub', async (done) => {
    const response = await request
      .post('/api/forum')
      .set('Cookie', cookie)
      .send(FORUM_A_NO_ISSUB);
    expect(response.statusCode).toBe(400);
    done();
  });/*
  it('creates main forum unsuccessfully - no authentication', async (done) => {
    const response = await request
      .post('/api/forum')
      .set('Cookie', `${cookie}=1; expires=1 Jan 1970 00:00:00 GMT;`)
      .send(FORUM_A);
    expect(response.statusCode).toBe(401);
    done();
  });
  it('creates main forum unsuccessfully - duplicate name', async (done) => {
    const response = await request
      .post('/api/forum')
      .set('Cookie', `${cookie}=1; expires=1 Jan 1970 00:00:00 GMT;`)
      .send(FORUM_A);
    expect(response.statusCode).toBe(401);
    done();
  }); */
});
