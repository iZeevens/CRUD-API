import users from '../server/serverUsers';
import { validate as isUuidValid } from 'uuid';
import { IIsUserExist } from '../types/serverControllersTypes';
import { sendResponse } from '../server/server';

const isUserExist = ({ userId, res }: IIsUserExist) => {
  const resultOfFindUser = users.findIndex((user) => user.id === userId);
  if (resultOfFindUser >= 0) {
    return { index: resultOfFindUser };
  } else if (!isUuidValid(userId)) {
    sendResponse({ res, statusCode: 400, data: { message: 'UserId is invalid' } });
  } else {
    sendResponse({ res, statusCode: 404, data: { message: 'User doesn`t exist' } });
  }
};

export default isUserExist;
