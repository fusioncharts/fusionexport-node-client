const FusionExport = require('../');
const fs = require('fs');
const path = require('path');

const chartConent = fs.readFileSync(path.resolve(__dirname, 'dashboard_charts.json')).toString();
const chartConfig = JSON.parse(chartConent);

const fusion = new FusionExport();

const exportConfig = {
  chartConfig,
  templateFilePath: path.join(__dirname, 'template.html'),
  callbackFilePath: path.join(__dirname, 'callback.js'),
};

fusion.export(exportConfig);

fusion.on('exportDone', (files) => {
  // files can be read from files array
  // e.g. [{tmpPath:"", realName: ""}]
});

fusion.on('exportStateChange', (state) => {
  // called for export progress state change
});

fusion.on('error', (err) => {
  // catch error here
});
