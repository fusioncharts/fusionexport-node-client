const FusionExport = require('../');
const path = require('path');

const svg = path.resolve(__dirname, 'chart.svg');

const fusion = new FusionExport();

const exportConfig = {
  inputSVG: svg,
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
