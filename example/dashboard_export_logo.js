// Adding a logo or heading to the dashboard

const path = require('path');

// Require FusionExport
const { ExportManager, ExportConfig } = require('../');

// Instantiate ExportManager
const exportManager = new ExportManager();

// Instantiate ExportConfig and add the required configurations
const exportConfig = new ExportConfig();

exportConfig.set('chartConfig', path.join(__dirname, 'resources', 'multiple.json'));
exportConfig.set('templateFilePath', path.join(__dirname, 'resources', 'template.html'));
exportConfig.set('dashboardLogo', path.join(__dirname, 'resources', 'logo.jpg'));
exportConfig.set('dashboardHeading', 'FusionCharts');
exportConfig.set('dashboardSubheading', 'The best charting library in the world');

// provide the export config
exportManager.export(exportConfig);

// Called when export is done
exportManager.on('exportDone', (outputFileBag) => {
  outputFileBag.forEach((op) => {
    console.log(`DONE: ${op.realName}`);
  });

  ExportManager.saveExportedFiles(outputFileBag);
});

// Called on each export state change
exportManager.on('exportStateChange', (state) => {
  console.log(`[${state.reporter}] ${state.customMsg}`);
});

// Called on erroe
exportManager.on('error', (err) => {
  console.error(err);
});
