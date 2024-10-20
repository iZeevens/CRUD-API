import users from './serverUsers';
import { validate as isUuidValid } from 'uuid';
import { ISendResponse, IHandleGetRequest } from '../types/serverControllersTypes';

const sendResponse = ({ res, statusCode, data }: ISendResponse) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};

const handleGetRequest = ({ res, parsedUrl }: IHandleGetRequest) => {
  const urlSplit = parsedUrl.split('/').slice(1);

  if (parsedUrl === '/api/users') {
    sendResponse({ res, statusCode: 200, data: users });
  } else if (parsedUrl.startsWith('/api/users') && urlSplit.length === 3) {
    const userUuid = urlSplit[2];
    const resultOfFindUser = users.find((user) => user.id === userUuid);
    if (resultOfFindUser) {
      sendResponse({ res, statusCode: 200, data: resultOfFindUser });
    } else if (!isUuidValid(userUuid)) {
      sendResponse({ res, statusCode: 400, data: { message: 'UserId is invalid' } });
    } else {
      sendResponse({ res, statusCode: 404, data: { message: 'User doesn`t exist' } });
    }
  } else {
    sendResponse({
      res,
      statusCode: 404,
      data: { message: 'Not Found' },
    });
  }
};

export default handleGetRequest;
