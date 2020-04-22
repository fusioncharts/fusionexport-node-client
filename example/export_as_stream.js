// Exporting a chart with best quality

const path = require("path");

// Require FusionExport
const { ExportManager, ExportConfig } = require("../");

// Instantiate ExportManager
const exportManager = new ExportManager();

// Instantiate ExportConfig and add the required configurations
const exportConfig = new ExportConfig();

exportConfig.set("chartConfig", path.join(__dirname, "resources", "single.json"));
exportConfig.set("quality", "best");

// provide the export config
exportManager
  .exportAsStream(exportConfig, ".", true)
  .then(exportedFiles => {
    Object.keys(exportedFiles).forEach(key => {
      console.log(key, exportedFiles[key]);
    });
  })
  .catch(err => {
    console.log(err);
  });
