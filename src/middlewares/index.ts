import { v4 as uuidv4 } from 'uuid';
import * as cors from 'cors';
import { PinoExpress } from "../utils/Logger";
import config from "../config";
const jwt = require('express-jwt');

export function Middlewares(app) {
  app.use(cors())
  app.use((req, _res, next) => {
    const reqId = uuidv4();
    req.id = reqId;
    _res.header('X-req-id' , reqId);
    next();
  });
  app.use(PinoExpress)
  app.use(jwt({ secret: config.JWT_SECRET, credentialsRequired: false }))
}
