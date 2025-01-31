import users from './serverUsers';
import cluster from 'cluster';
import { IHandlePostRequests } from '../types/serverControllersTypes';
import { validateFields } from '../utils/validateFields';
import { sendResponse } from './server';
import { v4 as uuidv4 } from 'uuid';

const handlePostRequests = ({ req, res }: IHandlePostRequests) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    const user = JSON.parse(body);
    const validate = validateFields(user, true);
    if (validate.valid) {
      const data = { id: uuidv4(), ...user };
      users.push(data);

      if (cluster.isWorker && process.send) {
        process.send({ type: 'syncUsers', data: users });
      }
      sendResponse({ res, statusCode: 201, data });
    } else {
      sendResponse({ res, statusCode: 400, data: { message: validate.message as string } });
    }
  });
};

export default handlePostRequests;
