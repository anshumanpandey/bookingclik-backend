import { v4 as uuidv4 } from 'uuid';
import { PinoExpress } from "../utils/Logger";
import config from "../config";
import ErrorMiddleware from './ErrorMiddleware';
const jwt = require('express-jwt');

export function Middlewares(app) {
  app.use((req, _res, next) => {
    const reqId = uuidv4();
    req.id = reqId;
    _res.header('X-req-id' , reqId);
    next();
  });
  app.use(PinoExpress)
  app.use(jwt({ secret: config.JWT_SECRET }).unless({path: ['/login', '/test']}))
  app.use(ErrorMiddleware)
}
