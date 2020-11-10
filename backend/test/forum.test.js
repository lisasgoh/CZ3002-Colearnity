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

const auth = {};

let cookie = null;

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
      cookies = response.headers['set-cookie'][0].split(',').map((item) => item.split(';')[0]);
      cookie = cookies.join(';');
      done();
    });
});

afterAll(async () => {
  console.log('HERE');
  await Forum.remove({});
  console.log('HERERE');
  await Users.remove({});
  console.log('HERERE');
  mongoose.connection.close();
});

describe('create main forum', () => {
  it('creates main forum successfully', async (done) => {
    const response = await request
      .post('/api/forum')
      .set('Cookie', cookie)
      .send(FORUM_A);
    console.log(response.body);
    const forum = response.body;
    console.log(forum);
    expect(response.statusCode).toBe(200);
    // expect(user.email).toBe(USER_A.email);
    done();
  });
  /*
  it('creates subforum successfully ', async (done) => {
    const response = await request
      .post('/api/users')
      .send(USER_NO_EMAIL);
    expect(response.statusCode).toBe(422); // test error msg?
    done();
  });
  it('creates user unsuccessfully - no password', async (done) => {
    const response = await request
      .post('/api/users')
      .send(USER_NO_PASSWORD);
    expect(response.statusCode).toBe(422); // test error msg?
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
  }); */
});
