// Require FusionExport components
const { ExportManager, ExportConfig } = require('../../');

// Instantiate ExportManager
const exportManager = new ExportManager();
// Instantiate ExportConfig
const exportConfig = new ExportConfig();

const chartConfig = {
  type: 'column2d',
  renderAt:"test",
  dataFormat: 'json',
  dataSource: {
    chart: {
      caption: 'Number of visitors last week',
      theme: 'ocean',
      subCaption: 'Bakersfield Central vs Los Angeles Topanga',
    },
    data: [
      {
        label: 'Mon',
        value: '15123',
      },
      {
        label: 'Tue',
        value: '14233',
      },
      {
        label: 'Wed',
        value: '25507',
      },
    ],
  },
};

exportConfig.set('chartConfig', chartConfig);
exportConfig.set('type',"xlsx");

// Export the chart by providing the exportConfig to the exportManager
exportManager.export(exportConfig, '.', true).then((exportedFiles) => {
  exportedFiles.forEach(file => console.log(file));
}).catch((err) => {
  console.log(err);
});