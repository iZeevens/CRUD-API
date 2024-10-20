import users from './serverUsers';
import { IHandlePutRequests } from '../types/serverControllersTypes';
import { sendResponse } from './server';
import isUserExist from '../utils/isUserExist';

const handlePutRequests = ({ req, res, parsedUrl }: IHandlePutRequests) => {
  const urlSplit = parsedUrl.split('/').slice(1);
  const resultOfFindUser = isUserExist({ userId: urlSplit[2], res });
  if (typeof resultOfFindUser?.index === 'number' && resultOfFindUser?.index >= 0) {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      const updatedFields = JSON.parse(body);

      if ('id' in updatedFields) {
        delete updatedFields.id;
      }

      users[resultOfFindUser.index] = {
        ...users[resultOfFindUser.index],
        ...updatedFields,
      };

      console.log(users);
      sendResponse({
        res,
        statusCode: 200,
        data: users[resultOfFindUser.index],
      });
    });
  }
};

export default handlePutRequests;
