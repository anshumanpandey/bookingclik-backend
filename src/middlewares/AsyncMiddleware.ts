import { AppError } from "../utils";

export const AsyncHandler = fn => (req, res, next) => {
  const p = new Promise((resolve, rejected) => {
    try {
      resolve(fn(req, res, next))
    } catch (error) {
      rejected(error)
    }
  });

  p.then(r => res.send(r))
    .catch(err => {
      if (err instanceof AppError) {
        res.status(err.response.status).send(err.response);
      } else {
        req.log.error(err);
        if (err.name === 'UnauthorizedError') {
          res.status(401).send({ status: 401, message: 'Invalid token' });
        } else {
          res.status(500).send({ status: 500, message: 'UNKNOW ERROR!' });
        }
      }
    })
}