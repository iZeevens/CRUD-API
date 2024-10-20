import http from 'node:http';
import url from 'node:url';
import handleGetRequest from './serverControllers';

const PORT = 3000;
const server = http.createServer((req, res) => {
  let parsedUrl;

  if (req.url) {
    parsedUrl = url.parse(req.url, true).pathname;
  }

  if (req.method === 'GET' && parsedUrl) {
    handleGetRequest({ res, parsedUrl });
  }
});

server.listen(PORT, () => {
  console.log(`User server listening on port ${PORT}`);
});
