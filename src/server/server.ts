import http from 'node:http';
import url from 'node:url';
import handleGetRequest from './serverGetRequest';
import handlePostRequests from './serverPostRequest';
import handlePutRequests from './serverPutRequest';
import handleDeleteRequest from './serverDeleteRequest';
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
  } else if (req.method === 'PUT' && parsedUrl) {
    handlePutRequests({ req, res, parsedUrl });
  } else if (req.method === 'DELETE' && parsedUrl) {
    handleDeleteRequest({ res, parsedUrl });
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
