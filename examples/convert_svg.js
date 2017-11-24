const FusionExport = require('../');
const path = require('path');

const svg = path.resolve(__dirname, 'chart.svg');

const fusion = new FusionExport();

const exportConfig = {
  inputSVG: svg,
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
