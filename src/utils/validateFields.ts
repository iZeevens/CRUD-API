import { IUsers } from '../types/serverControllersTypes';

const validateFields = (data: IUsers) => {
  const { username, age, hobbies } = data;

  if (Object.keys(data).length !== 3) {
    return { valid: false, message: 'Must have exactly 3 params - username, age, and hobbies' };
  }

  if (!username && typeof username !== 'string') {
    return { valid: false, message: 'Invalid or missing "username"' };
  }

  if (!age && typeof age !== 'number') {
    return { valid: false, message: 'Invalid or missing "age"' };
  }

  if (!Array.isArray(hobbies) || !hobbies.every((hobby) => typeof hobby === 'string')) {
    return { valid: false, message: 'Invalid or missing "hobbies", (must be an array of strings)' };
  }

  return { valid: true };
};

export { validateFields };
