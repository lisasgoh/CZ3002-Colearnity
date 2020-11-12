/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const mongoose = require('mongoose');

const supertest = require('supertest');
const app = require('../app');

const request = supertest.agent(app);

const Forum = require('../models/Forum');
const Users = require('../models/Users');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

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

const COMMENT_A = {
  text: 'test comment',
};

const COMMENT_A_NO_TEXT = {};

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

afterAll(async () => {
  await Forum.remove({});
  await Users.remove({});
  await Post.remove({});
  await Comment.remove({});
  mongoose.connection.close();
});

describe('create comment', () => {
  beforeAll(async (done) => {
    await request
      .post('/api/users/login')
      .send(USER_A_LOGIN);
    const responseForum = await request
      .post('/api/forum')
      .send(FORUM_A);
    expect(responseForum.statusCode).toBe(200);
    forum = responseForum.body;
    const responsePost = await request
      .post(`/api/posts?forum_id=${forum._id}`)
      .send(POST_A);
    expect(responsePost.statusCode).toBe(200);
    post = responsePost.body;
    done();
  });
  it('create comment unsuccessfully - no post id', async (done) => {
    const response = await request
      .post('/api/comments')
      .send(COMMENT_A);
    expect(response.statusCode).toBe(400);
    done();
  });
  it('create comment successfully', async (done) => {
    const response = await request
      .post(`/api/comments?post_id=${post._id}`)
      .send(COMMENT_A);
    expect(response.statusCode).toBe(200);
    done();
  });
  it('creates comment unsuccessfully - no text', async (done) => {
    const response = await request
      .post(`/api/comments?post_id=${post._id}`)
      .send(COMMENT_A_NO_TEXT);
    expect(response.statusCode).toBe(422);
    done();
  });
  it('create comment unsuccessfully - invalid post id', async (done) => {
    const response = await request
      .post(`/api/comments?post_id=${INVALID_ID}`)
      .send(COMMENT_A);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: 'invalid post id' });
    done();
  });
  it('create comment unsuccessfully - post does not exist', async (done) => {
    await Post.remove({});
    const response = await request
      .post(`/api/comments?post_id=${post._id}`)
      .send(COMMENT_A);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: 'Post does not exist' });
    done();
  });
  it('creates comment unsuccessfully - no authentication', async (done) => {
    const responseLogout = await request.post('/api/users/logout');
    expect(responseLogout.statusCode).toBe(302);
    const response = await request
      .post(`/api/comments?post_id=${post._id}`)
      .send(COMMENT_A);
    console.log(response.body);
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({ error: 'unauthorized user' });
    done();
  });
});
