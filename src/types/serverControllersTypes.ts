import http from 'node:http';

interface IUsers {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

interface ISendResponse {
  res: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  };
  statusCode: number;
  data: IUsers[];
}

interface IHandleGetRequest {
  req: http.IncomingMessage;
  res: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  };
  parsedUrl: string;
}

export { ISendResponse, IHandleGetRequest, IUsers };
