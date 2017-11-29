# Installation
To install the NodeJS module, simply use npm:

```bash
$ npm install fusionexport --save
```

To require this into your project:

```bash
const FusionExport = require('fusionexport');
```

# Usage

```js
const FusionExport = require('../');

const chartConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'chart-config-file.json')).toString());

const fusion = new FusionExport();

const exportConfig = {
  chartConfig,
};

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