# FusionExport Node Client

NodeJS SDK for FusionExport. Enables exporting from FusionExport through NodeJS.

## Installation
To install the NodeJS module, simply use npm:

```bash
$ npm install fusionexport-node-client --save
```

## Usage

To require the SDK into your project:

```js
const FusionExport = require('fusionexport-node-client');
```

## Getting Started

Let’s start with a simple chart export. For exporting a single chart, save the chartConfig in a JSON file. The config should be inside an array.

```js
// Exporting a chart

const path = require('path');

// Require FusionExport
const { ExportManager, ExportConfig } = require('../');

// Instantiate ExportManager
const exportManager = new ExportManager();

// Instantiate ExportConfig and add the required configurations
const exportConfig = new ExportConfig();

exportConfig.set('chartConfig', path.join(__dirname, 'resources', 'single.json'));

// provide the export config
exportManager.export(exportConfig);

// Called when export is done
exportManager.on('exportDone', (outputFileBag) => {
  outputFileBag.forEach((op) => {
    console.log(`DONE: ${op.realName}`);
  });

  ExportManager.saveExportedFiles(outputFileBag);
});

// Called on each export state change
exportManager.on('exportStateChange', (state) => {
  console.log(`[${state.reporter}] ${state.customMsg}`);
});

// Called on erroe
exportManager.on('error', (err) => {
  console.error(err);
});
```

## API Reference

You can find the full reference [here](https://www.fusioncharts.com/dev/exporting-charts/using-fusionexport/sdk-api-reference/nodejs.html).