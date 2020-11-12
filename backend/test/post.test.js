/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const mongoose = require('mongoose');

const supertest = require('supertest');
const app = require('../app');

const request = supertest.agent(app);

const Forum = require('../models/Forum');
const Users = require('../models/Users');
const Post = require('../models/Post');

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

const POST_A = {
  title: 'test post',
  description: 'test description',
};

const POST_A_NO_TITLE = {
  description: 'test description',
};

const INVALID_ID = '12345';

beforeAll(async (done) => {
  await request
    .post('/api/users')
    .send(USER_A)
    .then(() => {
      done();
    });
});

let forum = null;
let post = null;

afterAll(async (done) => {
  await Forum.remove({});
  await Users.remove({});
  await Post.remove({});
  mongoose.connection.close();
  done();
});

describe('create post', () => {
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
    it('create post unsuccessfully - no forum id', async (done) => {
      const response = await request
        .post('/api/posts')
        .send(POST_A);
      expect(response.statusCode).toBe(400);
      done();
    });
    it('create post successfully', async (done) => {
      const response = await request
        .post('/api/forum')
        .send(FORUM_A);
      forum = response.body;
      console.log(forum);
      // expect(response.statusCode).toBe(200);
      const responsePost = await request
        .post(`/api/posts?forum_id=${forum._id}`)
        .send(POST_A);
      post = responsePost.body;
      expect(responsePost.statusCode).toBe(200);
      done();
    });
    it('creates post unsuccessfully - no title', async (done) => {
      console.log(forum);
      const response = await request
        .post(`/api/posts?forum_id=${forum._id}`)
        .send(POST_A_NO_TITLE);
      expect(response.statusCode).toBe(422);
      done();
    });
    it('create post unsuccessfully - invalid forum id', async (done) => {
      const response = await request
        .post(`/api/posts?forum_id=${INVALID_ID}`)
        .send(POST_A);
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: 'invalid forum id' });
      done();
    });
    it('create post unsuccessfully - forum does not exist', async (done) => {
      await Forum.remove({});
      console.log(forum);
      const response = await request
        .post(`/api/posts?forum_id=${forum._id}`)
        .withCredentials()
        .send(POST_A);
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: 'Forum does not exist' });
      done();
    });
  });
  describe('without authentication', () => {
    it('creates post unsuccessfully - no authentication', async (done) => {
      const responseLogout = await request.post('/api/users/logout');
      expect(responseLogout.statusCode).toBe(302);
      const response = await request
        .post(`/api/posts?forum_id=${forum._id}`)
        .send(POST_A);
      console.log(response.body);
      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({ error: 'unauthorized user' });
      done();
    });
  });
});

describe('get post', () => {
  describe('get post - authentication', () => {
    beforeAll(async (done) => {
      await request
        .post('/api/users/login')
        .send(USER_A_LOGIN);
      const responseForum = await request
        .post('/api/forum')
        .send(FORUM_A);
      forum = responseForum.body;
      expect(responseForum.statusCode).toBe(200);
      const responsePost = await request
        .post(`/api/posts?forum_id=${forum._id}`)
        .send(POST_A);
      post = responsePost.body;
      expect(responsePost.statusCode).toBe(200);
      done();
    });
    it('get post successfully - with authentication', async (done) => {
      // await request
      //   .post('/api/users/login')
      //   .send(USER_A_LOGIN);
      const response = await request
        .get(`/api/posts/${post._id}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('_id');
      expect(response.body).toHaveProperty('userVote');
      done();
    });
    it('get post unsuccessfully - invalid ID', async (done) => {
      const response = await request
        .get(`/api/posts/${INVALID_ID}`);
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: 'invalid post id' });
      done();
    });
  });
  it('get post successfully - no authentication', async (done) => {
    const responseLogout = await request.post('/api/users/logout');
    expect(responseLogout.statusCode).toBe(302);
    const response = await request
      .get(`/api/posts/${post._id}`);
    console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.userVote).toBeUndefined();
    done();
  });
  describe('get post - remove post', () => {
    it('get post unsuccessfully - does not exist', async (done) => {
      await Post.remove({});
      const response = await request
        .get(`/api/posts/${post._id}`);
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: 'post does not exist' });
      done();
    });
  });
});
