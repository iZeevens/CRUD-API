import { IUsers } from '../types/serverControllersTypes';

const validateFields = (data: IUsers, isCheckMissing?: boolean) => {
  if ('id' in data) {
    delete data.id;
  }

  const { username, age, hobbies } = data;

  if (isCheckMissing) {
    if (!username) {
      return { valid: false, message: 'Missing "username"' };
    }
    if (age === undefined) {
      return { valid: false, message: 'Missing "age"' };
    }
    if (!hobbies) {
      return { valid: false, message: 'Missing "hobbies"' };
    }
  }

  if (typeof username !== 'string') {
    return { valid: false, message: 'Invalid "username" (must be a string)' };
  }

  if (typeof age !== 'number') {
    return { valid: false, message: 'Invalid "age" (must be a number)' };
  }

  if (hobbies !== undefined) {
    if (!Array.isArray(hobbies) || !hobbies.every((hobby) => typeof hobby === 'string')) {
      return { valid: false, message: 'Invalid "hobbies", (must be an array of strings)' };
    }
  }

  return { valid: true };
};

export { validateFields };
