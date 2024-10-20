import users from './serverUsers';
import { IHandleGetRequest } from '../types/serverControllersTypes';
import { sendResponse } from './server';
import isUserExist from '../utils/isUserExist';

const handleGetRequest = ({ res, parsedUrl }: IHandleGetRequest) => {
  const urlSplit = parsedUrl.split('/').slice(1);

  if (parsedUrl === '/api/users') {
    sendResponse({ res, statusCode: 200, data: users });
  } else if (parsedUrl.startsWith('/api/users') && urlSplit.length === 3) {
    const resultOfFindUser = isUserExist({ userId: urlSplit[2], res });
    const userIndex = resultOfFindUser?.index;
    if (typeof userIndex === 'number' && userIndex >= 0) {
      sendResponse({ res, statusCode: 200, data: users[userIndex] });
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
