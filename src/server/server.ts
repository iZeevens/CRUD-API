import http from 'node:http';
import url from 'node:url';
import handleGetRequest from './serverGetRequests';
import handlePostRequests from './serverPostRequests';
import { ISendResponse } from '../types/serverControllersTypes';

const PORT = 3000;
const server = http.createServer((req, res) => {
  let parsedUrl;

  if (req.url) {
    parsedUrl = url.parse(req.url, true).pathname;
  }

  if (req.method === 'GET' && parsedUrl) {
    handleGetRequest({ res, parsedUrl });
  } else if (req.method === 'POST') {
    handlePostRequests({ req, res });
  }
});

const sendResponse = ({ res, statusCode, data }: ISendResponse) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};

server.listen(PORT, () => {
  console.log(`User server listening on port ${PORT}`);
});

export { sendResponse };
