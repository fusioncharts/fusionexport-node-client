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
const fs = require('fs');
const path = require('path');

// require fusionexport
const FusionExport = require('fusionexport-node-client');

const chartConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'chart-config-file.json')).toString());
const host = '127.0.0.1';
const port = 1337;

// instantiate FusionExport
const fusion = new FusionExport({ host, port });

const exportConfig = {
  chartConfig,
};

// provide the export config
fusion.export(exportConfig);

fusion.on('exportDone', (files) => {
  // files can be read from files array
  // e.g. [{tmpPath:"", realName: ""}]
});

fusion.on('exportStateChange', (state) => {
  // called for export progress state change
});

fusion.on('error', (err) => {
  // catch error here
});
```

## API Reference

You can find the full reference [here](https://www.fusioncharts.com/dev/exporting-charts/using-fusionexport/sdk-api-reference/nodejs.html).