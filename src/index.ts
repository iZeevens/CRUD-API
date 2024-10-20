import { createServer, IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;

interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

const users: User[] = [];

// Parse request body (Utility function to handle JSON body)
function parseBody(req: IncomingMessage): Promise<{ username: string; age: number; hobbies: string }> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
  });
}

// Request handler
const requestHandler = async (req: IncomingMessage, res: ServerResponse) => {
  const { method, url } = req;

  // GET /api/users
  if (method === 'GET' && url === '/api/users') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
    return;
  }

  // POST /api/users
  if (method === 'POST' && url === '/api/users') {
    try {
      const body = await parseBody(req);
      if (!body.username || !body.age || !Array.isArray(body.hobbies)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid request body' }));
        return;
      }

      const newUser: User = {
        id: uuidv4(),
        username: body.username,
        age: body.age,
        hobbies: body.hobbies,
      };

      users.push(newUser);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    } catch {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid JSON' }));
    }
    return;
  }

  // Handle other cases
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Not found' }));
};

const server = createServer(requestHandler);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
