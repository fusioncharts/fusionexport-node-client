const FusionExport = require('../');
const fs = require('fs');
const path = require('path');

const chartConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'scrollchart.json')).toString());

const fusion = new FusionExport();

const exportConfig = {
  chartConfig,
  callbackFilePath: path.join(__dirname, 'expand_scroll.js'),
  asyncCapture: true,
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
