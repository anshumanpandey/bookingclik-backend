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
    .catch(next)
}