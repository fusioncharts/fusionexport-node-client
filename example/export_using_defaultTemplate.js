
const { ExportManager, ExportConfig } = require('..');
const path = require("path");
const fs = require('fs')

//establishing socket connection
// Instantiate ExportManager
const exportManager = new ExportManager();

// Instantiate ExportConfig
const exportConfig = new ExportConfig();

exportConfig.set("chartConfig", path.join(__dirname, "resources", "default_template.json"));

exportConfig.set('templateFormat', 'A4');
exportConfig.set('header', "My Header");
exportConfig.set('subheader', "My Subheader");

// Export the chart by providing the exportConfig to the exportManager
exportManager.export(exportConfig, '.', true, false).then((exportedFiles) => {
  exportedFiles.forEach(file => console.log(file));
}).catch((err) => {
  console.log(err);
});
