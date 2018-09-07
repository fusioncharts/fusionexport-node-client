// D3 export

const path = require('path');

// Require FusionExport
const { ExportManager, ExportConfig } = require('../');

// Instantiate ExportManager
const exportManager = new ExportManager();

// Instantiate ExportConfig and add the required configurations
const exportConfig = new ExportConfig();

exportConfig.set('templateFilePath', path.join(__dirname, 'resources', 'template_d3.html'));
exportConfig.set('type', 'jpg');
exportConfig.set('asyncCapture', true);

// provide the export config
exportManager.export(exportConfig).then((exportedFile) => {
  ExportManager.saveExportedFiles(exportedFile, '.', true);
}).catch((err) => {
  console.log(err);
});
