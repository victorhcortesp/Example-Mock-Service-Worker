const { stub } = require('sinon');
const { rest } = require('msw');

const config = require('../config');

const BASE_URL = 'http://localhost:8000';
stub(config, 'baseUrl').value(BASE_URL);

const handlers = [
  rest.post(`${BASE_URL}/user`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
      })
    );
  }),
  rest.get(`${BASE_URL}/users`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        username: 'username',
        firstName: 'firstName',
        lastName: 'lastName',
      })
    );
  }),
];

module.exports = { handlers };
