import { v4 as uuidv4 } from 'uuid';
import { ErrorCatcher } from "./ErrorCatcher";
import LoggerMiddleware from "../utils/Logger";


export function Middlewares(app) {
  app.use((req, _res, next) => {
    const reqId = uuidv4();
    req.id = reqId;
    _res.header('X-req-id' , reqId);
    next();
  });
  app.use(ErrorCatcher)
  app.use(LoggerMiddleware)

}
