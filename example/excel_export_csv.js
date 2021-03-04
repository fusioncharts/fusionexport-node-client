// Require FusionExport components
const { ExportManager, ExportConfig } = require('..');
const path = require("path");

// Instantiate ExportManager
const exportManager = new ExportManager();
// Instantiate ExportConfig
const exportConfig = new ExportConfig();



exportConfig.set("chartConfig", path.join(__dirname, "resources", "single.json"));
exportConfig.set('type',"csv");

// Export the chart by providing the exportConfig to the exportManager
exportManager.export(exportConfig, '.', true).then((exportedFiles) => {
  exportedFiles.forEach(file => console.log(file));
}).catch((err) => {
  console.log(err);
});

