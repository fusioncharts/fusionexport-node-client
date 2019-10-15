const path = require('path');

// Require FusionExport
const { ExportManager, ExportConfig } = require('../');

// Instantiate ExportManager
const exportManager = new ExportManager();

// Instantiate ExportConfig and add the required configurations
const exportConfig = new ExportConfig();

exportConfig.set('templateFilePath', path.join(__dirname, 'resources', 'template_timeseries.html'));
exportConfig.set('type', 'jpg');
exportConfig.set('asyncCapture', true);
exportConfig.set('maxWaitForCaptureExit', 10000);

// provide the export config
exportManager.export(exportConfig, '.', true).then((exportedFiles) => {
  exportedFiles.forEach(file => console.log(file));
}).catch((err) => {
  console.log(err);
});
