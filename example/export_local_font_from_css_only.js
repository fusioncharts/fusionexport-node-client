// ** IMPORT AND RESOLVE DEPENDENCIES ***

// Import 'path' core module of Node.js
const path = require("path");
const glob = require('glob');

var fontDirFiles=[];

// Import FusionExport SDK client for Node.js
const { ExportManager, ExportConfig } = require('..');

// ** EXPORT CONFIG ***

// Instantiate ExportConfig and add the required configurations
const exportConfig = new ExportConfig();

// Provide path of the chart configuration which we have defined above.
// You can also pass the same object as serialized JSON.
exportConfig.set(
  "chartConfig",
  path.join(__dirname, "resources", "chart-config-file.json")
);

// ATTENTION - Pass the path of the dashboard template
exportConfig.set(
  "templateFilePath",
  path.join(__dirname, "resources", "localfont-template.html")
);

// ** EXPORT-MANAGER ***

// Instantiate ExportManager
const exportManager = new ExportManager();

// * OUTPUT **

// Provide the exportConfig
// Optionally, print the exported file names and error messages, if any

setTimeout(() => {
  exportManager
    .export(exportConfig, (outputDir = "."), (unzip = true))
    .then((exportedFiles) => {
      exportedFiles.forEach((file) => console.log(file));
    })
    .catch((err) => {
      console.log(err);
    });
}, 500);
