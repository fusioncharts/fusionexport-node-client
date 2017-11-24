const FusionExport = require('../');
const fs = require('fs');
const path = require('path');

const chartConent = fs.readFileSync(path.resolve(__dirname, 'chart-config-file.json')).toString();
const chartConfig = JSON.parse(chartConent);

const fusion = new FusionExport();

const exportConfig = {
  chartConfig,
  type: 'pdf',
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
