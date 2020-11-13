const jwt = require('express-jwt');

const getTokenFromHeaders = (req) => {
  if (req.headers.token) {
    return req.headers.token;
  }
  return null;
};

const auth = {
  required: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    algorithms: ['HS256'],
  }),
  optional: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
    algorithms: ['HS256'],
  }),
};

module.exports = auth;
