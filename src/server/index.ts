import { server } from './server';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`User server listening on port ${PORT}`);
});
