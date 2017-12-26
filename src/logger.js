const winston = require('winston');
const os = require('os');
const path = require('path');

const HOME_DIR = os.homedir();

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: 'error',
    }),
    new (winston.transports.File)({ filename: path.join(HOME_DIR, 'fusionexport_node_client.log') }),
  ],
});

module.exports = logger;
