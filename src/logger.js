const winston = require('winston');
const os = require('os');
const path = require('path');
const fs = require('fs-extra');

const HOME_DIR = os.homedir();
const logPath = path.join(HOME_DIR, '.fusioncharts');
fs.ensureDirSync(logPath);

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: 'error',
    }),
    new (winston.transports.File)({ filename: path.join(logPath, 'fusionexport_node_client.log') }),
  ],
});

module.exports = logger;
