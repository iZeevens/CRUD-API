import { IHandleGetRequest } from '../types/serverControllersTypes';
import { sendResponse } from './server';
import isUserExist from '../utils/isUserExist';
import users from './serverUsers';

const handleDeleteRequest = ({ res, parsedUrl }: IHandleGetRequest) => {
  const urlSplit = parsedUrl.split('/').slice(1);
  const resultOfFindUser = isUserExist({ userId: urlSplit[2], res });
  const userIndex = resultOfFindUser?.index;
  if (typeof userIndex === 'number' && userIndex >= 0) {
    const deletedUser = users.splice(userIndex, 1);
    sendResponse({ res, statusCode: 204, data: deletedUser });
  }
};

export default handleDeleteRequest;
