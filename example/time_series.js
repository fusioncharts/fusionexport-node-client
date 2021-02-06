const { ExportManager, ExportConfig } = require("..");

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
        data: "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/line-chart-with-time-axis-data.json",
        schema: [
          {
            name: "Time",
            type: "date",
            format: "%d-%b-%y",
          },
          {
            name: "Grocery Sales Value",
            type: "number",
          },
        ],
      },
      caption: {
        text: "Sales Analysis json data all",
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
    exportedFiles.forEach(file => console.warn(file));
  })
  .catch(err => {
    console.error(err);
  });
