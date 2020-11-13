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
  is_student: false,
};

const USER_A_STUDENT = {
  username: 'student01',
  email: 'student@gmail.com',
  password: '123456',
  is_student: true,
};

const USER_A_LOGIN = {
  user: {
    email: 'test@gmail.com',
    password: '123456',
  },
};

const USER_STUDENT_LOGIN = {
  user: {
    email: 'student@gmail.com',
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

// let cookie = null;

let parentForum = null;
let subForum = null;

beforeAll(async (done) => {
  await request
    .post('/api/users')
    .send(USER_A);
  await request
    .post('/api/users')
    .send(USER_A_STUDENT);
  done();
});

afterAll(async () => {
  await Forum.remove({});
  await Users.remove({});
  await request.post('/api/users/logout');
  mongoose.connection.close();
});

describe('create main forum', () => {
  describe('with authentication', () => {
    beforeAll(async (done) => {
      await request
        .post('/api/users/login')
        .send(USER_A_LOGIN);
      // cookies = response.headers['set-cookie'][0]
      //   .split(',').map((item) => item.split(';')[0]);
      // cookie = cookies.join(';');
      done();
    });
    afterAll(async (done) => {
      const responseLogout = await request.post('/api/users/logout');
      expect(responseLogout.statusCode).toBe(302);
      done();
    });
    it('creates main forum successfully', async (done) => {
      const response = await request
        .post('/api/forum')
        // .set('Cookie', cookie)
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
    it('creates main forum unsuccessfully - duplicate name', async (done) => {
      const response = await request
        .post('/api/forum')
        .send(FORUM_A);
      expect(response.statusCode).toBe(422);
      expect(response.body).toEqual({ error: 'Forum already exists' });
      done();
    });
    it('creates main forum unsuccessfully - no authentication', async (done) => {
      const responseLogout = await request.post('/api/users/logout');
      expect(responseLogout.statusCode).toBe(302);
      const response = await request
        .post('/api/forum')
        .send(FORUM_A);
      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({ error: 'unauthorized user' });
      done();
    });
    it('creates main forum unsuccessfully - not student', async (done) => {
      await request
        .post('/api/users/login')
        .send(USER_STUDENT_LOGIN);
      const response = await request
        .post('/api/forum')
        .send(FORUM_A);
      expect(response.statusCode).toBe(401);
      done();
    });
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
  afterAll(async (done) => {
    const responseLogout = await request.post('/api/users/logout');
    expect(responseLogout.statusCode).toBe(302);
    done();
  });
  it('create sub forum unsuccessfully - parent forum id not given', async (done) => {
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
    const response = await request
      .post(`/api/forum?forum_id=${parentForum._id}`)
      .send(SUBFORUM_A);
    subForum = response.body;
    expect(response.statusCode).toBe(200);
    done();
  });
  it('create sub forum unsuccessfully - forum is not parent', async (done) => {
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
  it('get forum successfully - with authentication', async (done) => {
    await request
      .post('/api/users/login')
      .send(USER_A_LOGIN);
    const responsePost = await request
      .post('/api/forum')
      .send(FORUM_A);
    expect(responsePost.statusCode).toBe(200);
    forum = responsePost.body;
    const response = await request
      .get(`/api/forum/${forum._id}`);
    const forumFromDB = response.body;
    expect(response.statusCode).toBe(200);
    expect(forumFromDB).toHaveProperty('_id');
    expect(forumFromDB).toHaveProperty('isSubscribed');
    done();
  });
  it('get forum unsuccessfully - invalid ID', async (done) => {
    const response = await request
      .get(`/api/forum/${INVALID_ID}`);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: 'invalid forum id' });
    done();
  });
  it('get forum successfully - no authentication ', async (done) => {
    const responseLogout = await request.post('/api/users/logout');
    expect(responseLogout.statusCode).toBe(302);
    const responseGet = await request
      .get(`/api/forum/${forum._id}`);
    expect(responseGet.statusCode).toBe(200);
    expect(responseGet.body).toHaveProperty('_id');
    expect(responseGet.body.isSubscribed).toBeUndefined();
    done();
  });
  it('get forum unsuccessfully - does not exist', async (done) => {
    await Forum.remove({});
    const response = await request
      .get(`/api/forum/${forum._id}`);
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ error: 'forum does not exist' });
    done();
  });
});

let newForum = null;
let newSubForum = null;

describe('subscribe/unsubscribe', () => {
  beforeAll(async (done) => {
    await request
      .post('/api/users/login')
      .send(USER_A_LOGIN);
    const responsePost = await request
      .post('/api/forum')
      .send(FORUM_A);
    expect(responsePost.statusCode).toBe(200);
    newForum = responsePost.body;
    const response = await request
      .post(`/api/forum?forum_id=${newForum._id}`)
      .send(SUBFORUM_A);
    newSubForum = response.body;
    expect(response.statusCode).toBe(200);
    done();
  });
  it('subscribe unsuccessful - invalid ID', async (done) => {
    const response = await request
      .post(`/api/forum/${INVALID_ID}`);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: 'invalid forum id' });
    done();
  });
  it('subscribe unsuccessful - forum is subforum', async (done) => {
    const response = await request
      .post(`/api/forum/${newSubForum._id}`);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: 'Cannot subscribe to sub forum' });
    done();
  });
  it('subscribe successful', async (done) => {
    const response = await request
      .post(`/api/forum/${newForum._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ success: 'Success: User has successfully subscribed / unsubscribed' });
    done();
  });
  it('unsubscribe successful', async (done) => {
    const response = await request
      .post(`/api/forum/${newForum._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ success: 'Success: User has successfully subscribed / unsubscribed' });
    done();
  });
  it('subscribe unsuccessful - forum does not exist', async (done) => {
    await Forum.remove({});
    const response = await request
      .post(`/api/forum/${newForum._id}`);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: 'forum does not exist' });
    done();
  });
  it('subscribe unsuccessful - not authenticated', async (done) => {
    const responseLogout = await request.post('/api/users/logout');
    expect(responseLogout.statusCode).toBe(302);
    const response = await request
      .post(`/api/forum/${newForum._id}`);
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({ error: 'unauthorized user' });
    done();
  });
});
