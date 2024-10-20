import users from './serverUsers';
import { ISendResponse, IHandleGetRequest } from '../types/serverControllersTypes';

const sendResponse = ({ res, statusCode, data }: ISendResponse) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};

const handleGetRequest = ({ res, parsedUrl }: IHandleGetRequest) => {
  if (parsedUrl === '/api/users') {
    sendResponse({ res, statusCode: 200, data: users });
  } else {
    sendResponse({
      res,
      statusCode: 404,
      data: { message: 'Not Found' },
    });
  }
};

export default handleGetRequest;
