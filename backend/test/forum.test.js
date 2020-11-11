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
// const auth = {};

// const cookie = null;

beforeAll(async (done) => {
  await request
    .post('/api/users')
    .send(USER_A)
    .then(() => {
      // const { user } = (response.body);
      // auth.token = user.token;
      // auth.user_id = user._id;
      done();
    });
});

afterAll(async () => {
  await Forum.remove({});
  await Users.remove({});
  mongoose.connection.close();
});

describe('create main forum', () => {
  describe('without authentication', () => {
    it('creates main forum unsuccessfully - no authentication', async (done) => {
      const response = await request
        .post('/api/forum')
        .send(FORUM_A);
      expect(response.statusCode).toBe(401);
      done();
    });
  });
  describe('with authentication', () => {
    beforeAll(async (done) => {
      await request
        .post('/api/users/login')
        .send(USER_A_LOGIN)
        .then(() => {
          // cookies = response.headers['set-cookie'][0]
          // .split(',').map((item) => item.split(';')[0]);
          // cookie = cookies.join(';');
          done();
        });
    });
    it('creates main forum successfully', async (done) => {
      const response = await request
        .post('/api/forum')
        .send(FORUM_A);
      expect(response.statusCode).toBe(200);
      done();
    });
    it('creates main forum unsuccessfully - no name', async (done) => {
      const response = await request
        .post('/api/forum')
        .send(FORUM_A_NO_NAME);
      expect(response.statusCode).toBe(400);
      done();
    });
    it('creates main forum unsuccessfully - no description', async (done) => {
      const response = await request
        .post('/api/forum')
        .send(FORUM_A_NO_DESCRIPTION);
      expect(response.statusCode).toBe(400);
      done();
    });
    it('creates main forum unsuccessfully - no is_sub', async (done) => {
      const response = await request
        .post('/api/forum')
        .send(FORUM_A_NO_ISSUB);
      expect(response.statusCode).toBe(400);
      done();
    });
    it('creates main forum unsuccessfully - duplicate name', async (done) => {
      const response = await request
        .post('/api/forum')
        .send(FORUM_A);
      expect(response.statusCode).toBe(401);
      done();
    });
  });
});
