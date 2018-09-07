// Changing the export type

const path = require('path');

// Require FusionExport
const { ExportManager, ExportConfig } = require('../');

// Instantiate ExportManager
const exportManager = new ExportManager();

// Instantiate ExportConfig and add the required configurations
const exportConfig = new ExportConfig();

exportConfig.set('chartConfig', path.join(__dirname, 'resources', 'single.json'));
exportConfig.set('type', 'pdf');

// provide the export config
exportManager.export(exportConfig).then((exportedFile) => {
  ExportManager.saveExportedFiles(exportedFile, '.', true);
}).catch((err) => {
  console.log(err);
});
