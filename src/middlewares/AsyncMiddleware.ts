import { AppError } from "../utils/AppError";

export const AsyncHandler = fn => (req, res, next) =>
  Promise
    .resolve(fn(req, res, next))
    .then(r => res.send(r))
    .catch(err => {
        if (err instanceof AppError) {
            next(err.response);
        } else {
            next({ status: 500, message: 'UNKNOW ERROR!'});
        }
    })