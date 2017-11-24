const FusionExport = require('../');
const fs = require('fs');
const path = require('path');

const chartConent = fs.readFileSync(path.resolve(__dirname, 'dashboard_charts.json')).toString();
const chartConfig = JSON.parse(chartConent);

const fusion = new FusionExport();

const exportConfig = {
  chartConfig,
  templateFilePath: path.join(__dirname, 'template.html'),
  dashboardLogo: path.join(__dirname, 'logo.png'),
  dashboardHeading: 'Dashboard',
  dashboardSubheading: 'Powered by FusionExport',
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
