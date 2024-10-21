import users from './serverUsers';
import cluster from 'node:cluster';
import { IHandlePutRequests } from '../types/serverControllersTypes';
import { sendResponse } from './server';
import { validateFields } from '../utils/validateFields';
import isUserExist from '../utils/isUserExist';

const handlePutRequests = ({ req, res, parsedUrl }: IHandlePutRequests) => {
  const urlSplit = parsedUrl.split('/').slice(1);
  const resultOfFindUser = isUserExist({ userId: urlSplit[2], res });
  const userIndex = resultOfFindUser?.index;
  if (typeof userIndex === 'number' && userIndex >= 0) {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      const updatedFields = JSON.parse(body);
      const validate = validateFields(updatedFields);

      if (validate.valid) {
        users[userIndex] = {
          ...users[userIndex],
          ...updatedFields,
        };

        if (cluster.isWorker && process.send) {
          process.send({ type: 'syncUsers', data: users });
        }

        sendResponse({
          res,
          statusCode: 200,
          data: users[userIndex],
        });
      } else {
        sendResponse({ res, statusCode: 400, data: { message: validate.message as string } });
      }
    });
  }
};

export default handlePutRequests;
