const fs = require('fs');
const path = require('path');

// require fusionexport
const { ExportManager, ExportConfig } = require('../');

const chartConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'scrollchart.json')).toString());
const host = '127.0.0.1';
const port = 1337;

// instantiate FusionExport
const fusion = new ExportManager({ host, port });

const exportConfig = new ExportConfig();

exportConfig.set('chartConfig', chartConfig);
exportConfig.set('callbackFilePath', path.join(__dirname, 'expand_scroll.js'));
exportConfig.set('asyncCapture', true);

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
