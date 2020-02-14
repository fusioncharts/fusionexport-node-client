const { ExportManager, ExportConfig } = require("..");
const ftData = require("./resources/ftData");
const ftSchema = require("./resources/ftSchema");
// Instantiate ExportManager
const exportManager = new ExportManager();
const exportConfig = new ExportConfig();

const chartConfig = [
  {
    type: "timeseries",
    renderAt: "chart-container",
    width: 700,
    height: 400,
    creditLabel: false,
    dataSource: {
      data: {
        data: ftData,
        schema: ftSchema,
      },
      caption: {
        text: "Sales Analysis json data all",
        style: {
          text: {
            fill: "#ff0000",
          },
        },
      },
      subCaption: {
        text: "Grocery",
      },
      yAxis: [
        {
          plot: {
            value: "Grocery Sales Value",
          },
          format: {
            prefix: "$",
          },
          title: "Sale Value",
        },
      ],
    },
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
