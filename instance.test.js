const { server } = require('./mocks/server.js');
const { addPosition } = require('./instance.js');

describe('Axios API', () => {
  beforeAll(() =>
    server.listen({
      onUnhandledRequest: 'warn', // I added this but it doesn't show me anything, as if it was detecting the route correctly.
    })
  );

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should call axios and return a response', async () => {
    server.printHandlers(); // This is showing me the route configurations fine.

    const data = {
      username: 'username',
      firstName: 'firstName',
      lastName: 'lastName',
    };

    const response = await addPosition(data);

    console.log(response); // I just want to validate if it is returning the mocked value.
  });
});
