const FusionExport = require('../');
const fs = require('fs');
const path = require('path');

const chartConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'bulk.json')).toString());

const fusion = new FusionExport();

const exportConfig = {
  chartConfig,
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
