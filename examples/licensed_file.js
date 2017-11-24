const FusionExport = require('../');
const fs = require('fs');
const path = require('path');

const chartConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'chart-config-file.json')).toString());

const fusion = new FusionExport();

const exportConfig = {
  chartConfig,
  libraryDirectoryPath: path.join(__dirname, 'fusioncharts'),
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
