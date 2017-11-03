const winston = require('winston');

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: 'error',
    }),
    new (winston.transports.File)({ filename: 'logger.log' }),
  ],
});

module.exports = logger;
