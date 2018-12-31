const { ExportManager, ExportConfig } = require('./');

const exportManager = new ExportManager();

const exportConfig = new ExportConfig();

exportConfig.set('chartConfig', {
  width: 100,
  renderAt: 'chartContainer1',
});
exportConfig.set('templateFilePath', '<html><head></head><body></body></html>');
exportConfig.set('type', 'png');
exportConfig.set('maxWaitForCaptureExit', '5000');
exportConfig.set('templateURL', 'https://google.com');
exportConfig.set('templateHeight', '500');
exportConfig.set('templateWidth', '1000');
exportConfig.set('templateFormat', 'A4');

exportManager.export(exportConfig, '.', true).then((exportedFiles) => {
  exportedFiles.forEach(file => console.log(file));
}).catch((err) => {
  console.log(err);
});
