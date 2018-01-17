const path = require('path');

const { ExportManager, ExportConfig } = require('../');

const chartConfigFile = path.resolve(__dirname, 'dashboard_charts.json');

const host = '127.0.0.1';
const port = 1337;

// instantiate FusionExport
const fusion = new ExportManager({ host, port });

const exportConfig = new ExportConfig();

exportConfig.set('chartConfig', chartConfigFile);
exportConfig.set('templateFilePath', path.join(__dirname, './sample1/html/template.html'));
exportConfig.set('dashboardLogo', path.join(__dirname, 'logo.png'));
exportConfig.set('dashboardHeading', 'Dashboard');
exportConfig.set('dashboardSubheading', 'Powered by FusionExport');

exportConfig.getFormattedConfigs();
// provide the export config
fusion.export(exportConfig);

fusion.on('exportDone', (exportedOutput) => {
  ExportManager.saveExportedFiles('./exported_files', exportedOutput);
});

fusion.on('exportStateChange', (state) => {
  // called for export progress state change
});

fusion.on('error', (err) => {
  // catch error here
});
