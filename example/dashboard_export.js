// Exporting a dashboard

const path = require("path");

// Require FusionExport
const { ExportManager, ExportConfig } = require("../");

// Instantiate ExportManager
const exportManager = new ExportManager();

// Instantiate ExportConfig and add the required configurations
const exportConfig = new ExportConfig();

exportConfig.set("chartConfig", path.join(__dirname, "resources", "multiple.json"));
exportConfig.set("templateFilePath", path.join(__dirname, "resources", "template.html"));
exportConfig.set("type", "pdf");
exportConfig.set("headerEnabled", false);
exportConfig.set("footerEnabled", "true");

// provide the export config
exportManager
  .export(exportConfig, ".", true)
  .then(exportedFiles => {
    exportedFiles.forEach(file => console.log(file));
  })
  .catch(err => {
    console.log(err);
  });
