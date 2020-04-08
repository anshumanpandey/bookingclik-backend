export const ErrorCatcher = (error, request, response, next) => {
    response.status(error.response.status).send(error.response);
}