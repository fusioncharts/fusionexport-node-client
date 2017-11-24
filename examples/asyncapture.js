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
  console.log(files);
});

fusion.on('exportStateChange', (state) => {
  console.log(state);
});

fusion.on('error', (err) => {
  console.error(err);
});
