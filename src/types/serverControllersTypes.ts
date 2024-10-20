import http from 'node:http';

interface IUsers {
  id?: string;
  username: string;
  age: number;
  hobbies: string[];
}

interface ISendResponse {
  res: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  };
  statusCode: number;
  data: IUsers[] | IUsers | { message: string };
}

interface IHandleGetRequest {
  res: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  };
  parsedUrl: string;
}

interface IHandlePostRequests {
  res: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  };
  req: http.IncomingMessage;
}

export { IUsers, ISendResponse, IHandleGetRequest, IHandlePostRequests };
