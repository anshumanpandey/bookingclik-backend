const pino = require('pino');
const noir = require('pino-noir')
const logger = pino()

const PinoExpress = require('express-pino-logger')({
  logger: logger,
  serializers: noir({
    req: require('express-pino-logger').stdSerializers.req,
    res: require('pino').stdSerializers.res,
    err: require('pino').stdSerializers.err,
  },
  ['req.headers.authorization'])
});

export {
  PinoExpress,
  logger
};