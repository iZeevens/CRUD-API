import { randomUUID } from 'crypto';
import { IUsers } from '../types/serverControllersTypes';

const users: IUsers[] = [{ id: randomUUID(), username: 'iZeevens', age: 19, hobbies: [] }];

export default users;
