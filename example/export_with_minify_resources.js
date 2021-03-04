// ** IMPORT AND RESOLVE DEPENDENCIES ***

// Import 'path' core module of Node.js
const path = require('path');

// Import FusionExport SDK client for Node.js
const {
    ExportManager,
    ExportConfig
} = require('../index');


// ** EXPORT CONFIG ***

// Instantiate ExportConfig and add the required configurations
const exportConfig = new ExportConfig();

// Provide path of the chart configuration which we have defined above.
// You can also pass the same object as serialized JSON.
exportConfig.set('chartConfig', path.join(__dirname, 'resources', 'chart-config-file-for-big.json'));
exportConfig.set('templateFilePath', path.join(__dirname, 'resources', 'dashboard-big-template.html'));

//Optional
exportConfig.set('type', 'pdf');
exportConfig.set('quality', 'best');


// ** EXPORT-MANAGER ***

// Instantiate ExportManager
// Add minify resources option
const exportManager = new ExportManager({minifyResources: true});


// * OUTPUT **

// Provide the exportConfig. By default it returns a promise.
// Optionally, print the exported file names and error messages, if any

exportManager.export(exportConfig, outputDir = '.', unzip = true).then((exportedFiles) => {
  exportedFiles.forEach(file => console.log(file));
}).catch((err) => {
  console.log(err);
});