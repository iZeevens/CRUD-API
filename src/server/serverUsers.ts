import { v4 as uuidv4 } from 'uuid';
import { IUsers } from '../types/serverControllersTypes';

const users: IUsers[] = [{ id: uuidv4(), username: 'iZeevens', age: 19, hobbies: [] }];

export default users;
