import { AppError } from "../utils";

export const AsyncHandler = fn => (req, res, next) =>
  Promise
    .resolve(fn(req, res, next))
    .then(r => res.send(r))