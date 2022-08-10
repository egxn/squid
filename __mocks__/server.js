const inkServer = {
  start: jest.fn(),
  stop: jest.fn(),
  status: 500,
  server: null,
  content: '',
  setContent: jest.fn(),
};

const createHtmlContent = jest.fn(() => '<html></html>');

const server = {
  inkServer,
  createHtmlContent,
};

module.exports = server;