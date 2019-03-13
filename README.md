# FusionExport Node Client

Node.js SDK for FusionExport. Enables exporting from Node.js using FusionExport.

## Installation
To install this module, simply use npm:

```bash
npm install --save fusionexport-node-client
```

## Usage

To require the SDK into your project:

```js
const { ExportManager, ExportConfig } = require('fusionexport-node-client');
```

## Getting Started

Start with a simple chart export. For exporting a single chart just pass the chart configuration as you would have passed it to the FusionCharts constructor.

```js
// Require FusionExport components
const { ExportManager, ExportConfig } = require('fusionexport-node-client');

// Instantiate ExportManager
const exportManager = new ExportManager();

// Instantiate ExportConfig
const exportConfig = new ExportConfig();

const chartConfig = {
  type: 'column2d',
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

// Export the chart by providing the exportConfig to the exportManager
exportManager.export(exportConfig, '.', true).then((exportedFiles) => {
  exportedFiles.forEach(file => console.log(file));
}).catch((err) => {
  console.log(err);
});
```

## API Reference

You can find the full reference [here](https://www.fusioncharts.com/dev/exporting-charts/using-fusionexport/sdk-api-reference/nodejs.html).