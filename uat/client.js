const FcNodeJsExportManager = require('../');
const logger = require('../src/logger');
const chartConfig = require('./data/chartConfig.js');

const exportManager = new FcNodeJsExportManager();
const options = {
  chartConfig,
  type: 'jpeg',
};


exportManager.export(options).then((data) => {
  logger.info(`${JSON.stringify(data, null, 2)}`);
}).catch((e) => {
  logger.error(e);
});

// exportManager.on('exportDone', (data) => {
//   logger.info(`From on exportDone event ${data}`);
// });

// exportManager.on('error', (err) => {
//   logger.error(err);
// });
