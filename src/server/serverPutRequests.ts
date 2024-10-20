import users from './serverUsers';
import { IHandlePutRequests } from '../types/serverControllersTypes';
import { sendResponse } from './server';
import { validateFields } from '../utils/validateFields';
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
      const validate = validateFields(updatedFields);

      if (validate.valid) {
        users[resultOfFindUser.index] = {
          ...users[resultOfFindUser.index],
          ...updatedFields,
        };

        sendResponse({
          res,
          statusCode: 200,
          data: users[resultOfFindUser.index],
        });
      } else {
        sendResponse({ res, statusCode: 400, data: { message: validate.message as string } });
      }
    });
  }
};

export default handlePutRequests;
