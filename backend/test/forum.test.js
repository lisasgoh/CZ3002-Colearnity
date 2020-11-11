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

const SUBFORUM_A = {
  name: 'test sub forum',
  description: 'test description',
  is_sub: true,
};

const SUBFORUM_B = {
  name: 'test sub forum 2',
  description: 'test description 2',
  is_sub: true,
};

const INVALID_ID = '12345';

// const auth = {};

// const cookie = null;

let parentForum = null;
let subForum = null;

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
      parentForum = response.body;
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
    /*
    it('creates main forum unsuccessfully - duplicate name', async (done) => {
      const response = await request
        .post('/api/forum')
        .send(FORUM_A);
      expect(response.statusCode).toBe(401);
      done();
    }); */
  });
});

describe('create sub forum', () => {
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
  it('create sub forum successfully', async (done) => {
    const response = await request
      .post('/api/forum')
      .send(SUBFORUM_A);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: 'parent forum not given' });
    done();
  });
  it('create sub forum unsuccessfully - invalid parent forum id', async (done) => {
    const response = await request
      .post(`/api/forum?forum_id=${INVALID_ID}`)
      .send(SUBFORUM_A);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: 'invalid forum id' });
    done();
  });
  it('create sub forum successfully', async (done) => {
    console.log(parentForum);
    const response = await request
      .post(`/api/forum?forum_id=${parentForum._id}`)
      .send(SUBFORUM_A);
    subForum = response.body;
    expect(response.statusCode).toBe(200);
    done();
  });
  it('create sub forum unsuccessfully - forum is not parent', async (done) => {
    console.log(parentForum);
    const response = await request
      .post(`/api/forum?forum_id=${subForum._id}`)
      .send(SUBFORUM_B);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: 'parent forum is not a main forum' });
    done();
  });
  it('create sub forum unsuccessfully - parentforum does not exist', async (done) => {
    await Forum.remove({});
    const response = await request
      .post(`/api/forum?forum_id=${parentForum._id}`)
      .send(SUBFORUM_B);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: 'parent forum does not exist' });
    done();
  });
});

let forum = null;

describe('get forum', () => {
  it('get forum successfully ', async (done) => {
    const responsePost = await request
      .post('/api/forum')
      .send(FORUM_A);
    forum = responsePost.body;
    const responseGet = await request
      .get(`/api/forum/${forum._id}`);
    expect(responseGet.statusCode).toBe(200);
    done();
  });
  it('get forum unsuccessfully - invalid ID', async (done) => {
    const response = await request
      .get(`/api/forum/${INVALID_ID}`);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: 'invalid forum id' });
    done();
  });
  it('get forum unsuccessfully - does not exist', async (done) => {
    await Forum.remove({});
    const response = await request
      .get(`/api/forum/${forum._id}`);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: 'forum does not exist' });
    done();
  });
});
