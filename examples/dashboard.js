const fs = require('fs');
const path = require('path');
// require fusionexport
const FusionExport = require('../');
const ExportConfig = require('../src/ExportConfig');
const chartContent = fs.readFileSync(path.resolve(__dirname, 'dashboard_charts.json')).toString();
const chartConfig = JSON.parse(chartContent);

const host = '127.0.0.1';
const port = 1337;

// instantiate FusionExport
const fusion = new FusionExport();

const exportConfig = new ExportConfig(); 
exportConfig.set('chartConfig', chartConfig);
exportConfig.set('templateFilePath', path.join(__dirname, 'template.html'));

// provide the export config
fusion.export(exportConfig);

fusion.on('exportDone', (files) => {
	// files can be read from files array
	// e.g. [{tmpPath:"", realName: ""}]

	files.data.forEach((item) => {
		const filePath = path.join(__dirname, 'bulk', item.realName);
		console.log(filePath);
    const data = Buffer.from(item.fileContent, 'base64');
		fs.writeFileSync(filePath, data);
	});
});

fusion.on('exportStateChange', (state) => {
	// called for export progress state change
	console.log(`state: ${JSON.stringify(state)}`);
});

fusion.on('error', (err) => {
	// catch error here
	console.log(`error: ${JSON.stringify(err)}`);
});
