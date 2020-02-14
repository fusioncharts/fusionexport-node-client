const { ExportManager, ExportConfig } = require("../");

const exportManager = new ExportManager();

// Instantiate ExportConfig and add the required configurations
const exportConfig = new ExportConfig();

const chartConfig = [
  {
    type: "Column2D",
    width: "700",
    height: "400",
    dataFormat: "jsonurl",
    dataSource: "https://static.fusioncharts.com/sample/oilReserves.json",
  },
];

exportConfig.set("chartConfig", chartConfig);

// provide the export config
exportManager
  .export(exportConfig, ".", true)
  .then(exportedFiles => {
    exportedFiles.forEach(file => console.log(file));
  })
  .catch(err => {
    console.log(err);
  });
