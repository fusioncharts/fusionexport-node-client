// Chart.js export

const path = require('path');

// Require FusionExport
const { ExportManager, ExportConfig } = require('../');

// Instantiate ExportManager
const exportManager = new ExportManager();

// Instantiate ExportConfig and add the required configurations
const exportConfig = new ExportConfig();

exportConfig.set('templateFilePath', path.join(__dirname, 'resources', 'template_chartjs.html'));
exportConfig.set('type', 'jpg');
exportConfig.set('asyncCapture', true);

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
