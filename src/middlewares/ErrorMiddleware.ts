import { AppError } from "../utils";

export default (err, req, res, next) => {
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
}