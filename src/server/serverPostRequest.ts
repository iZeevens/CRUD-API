import users from './serverUsers';
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
      sendResponse({ res, statusCode: 200, data });
    } else {
      sendResponse({ res, statusCode: 400, data: { message: validate.message as string } });
    }
  });
};

export default handlePostRequests;
