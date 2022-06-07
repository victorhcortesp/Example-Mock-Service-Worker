const { rest } = require('msw');
const mswNode = require('msw/node');
const axios = require('axios');

const BASE_URL = 'http://localhost:8000';

const server = mswNode.setupServer(
  rest.get(`${BASE_URL}/users`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          username: 'username',
          firstName: 'firstName',
          lastName: 'lastName',
        },
      ])
    );
  }),
  rest.get(`${BASE_URL}/users/:id`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: +req.params.id,
        username: 'username',
        firstName: 'firstName',
        lastName: 'lastName',
      })
    );
  }),
  rest.post(`${BASE_URL}/users`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
      })
    );
  }),
  rest.put(`${BASE_URL}/users/:id`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        id: +req.params.id,
        username: 'username',
        firstName: 'firstName',
      })
    )
  ),
  rest.delete(`${BASE_URL}/users/:id`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ id: +req.params.id }))
  )
);

describe('Axios API', () => {
  beforeAll(() =>
    server.listen({
      onUnhandledRequest: 'warn', // I added this but it doesn't show me anything, as if it was detecting the route correctly.
    })
  );

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should call axios get and return a response', async () => {
    const expectedData = [
      {
        username: 'username',
        firstName: 'firstName',
        lastName: 'lastName',
      },
    ];

    const response = await axios.get(`${BASE_URL}/users`);
    expect(response).toMatchObject({ data: expectedData, status: 200 });
  });

  it('should call axios get by id and return a response', async () => {
    const id = 1;
    const expectedData = {
      id,
      username: 'username',
      firstName: 'firstName',
      lastName: 'lastName',
    };

    const response = await axios.get(`${BASE_URL}/users/${id}`);
    expect(response).toMatchObject({ data: expectedData, status: 200 });
  });

  it('should call axios post and return a response', async () => {
    server.printHandlers(); // This is showing me the route configurations fine.

    const data = {
      username: 'username',
      firstName: 'firstName',
      lastName: 'lastName',
    };

    const response = await axios.post(`${BASE_URL}/users`, data);
    console.log(response.data);
  });

  it('should call axios put by id and return a response', async () => {
    const id = 1;
    const expectedData = {
      id,
      username: 'username',
      firstName: 'firstName',
    };

    const response = await axios.put(`${BASE_URL}/users/${id}`);
    expect(response).toMatchObject({ data: expectedData, status: 200 });
  });

  it('should call axios delete by id and return a response', async () => {
    const id = 1;
    const expectedData = { id };

    const response = await axios.delete(`${BASE_URL}/users/${id}`);
    expect(response).toMatchObject({ data: expectedData, status: 200 });
  });
});
