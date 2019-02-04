const fs = require('fs');
const os = require('os');
const path = require('path');
const { expect } = require('chai');
const ExportConfig = require('../src/ExportConfig');

describe('ExportConfig', () => {
  const exportConfig = new ExportConfig();

  it('should parse typings file on initialization', () => {
    const typings = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'metadata', 'fusionexport-typings.json')));
    expect(exportConfig.typings).to.deep.equal(typings);
  });

  it('should parse meta file on initialization', () => {
    const meta = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'metadata', 'fusionexport-meta.json')));
    expect(exportConfig.metadata).to.deep.equal(meta);
  });

  it('should set clientName as NODE on initialization', () => {
    expect(exportConfig.clientName).to.equal('NODE');
  });

  describe('ExportConfig.set', () => {
    describe('chartConfig', () => {
      it('should take file path', () => {
        const exampleConfigPath = path.join(__dirname, '..', 'example', 'resources', 'multiple.json');
        exportConfig.set('chartConfig', exampleConfigPath);
        expect(exportConfig.get('chartConfig')).to.equal(exampleConfigPath);
      });

      it('should take strigified object', () => {
        const exampleConfig = fs.readFileSync(path.join(__dirname, '..', 'example', 'resources', 'multiple.json')).toString();
        exportConfig.set('chartConfig', exampleConfig);
        expect(exportConfig.get('chartConfig')).to.equal(exampleConfig);
      });

      it('should take object', () => {
        const exampleConfigObj = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'example', 'resources', 'multiple.json')));
        exportConfig.set('chartConfig', exampleConfigObj);
        expect(exportConfig.get('chartConfig')).to.equal(JSON.stringify(exampleConfigObj));
      });

      it('should not take boolean', () => {
        const exampleConfig = true;
        const errorName = 'Invalid Data Type';
        const errorMsg = /^chartConfig of type boolean is unsupported\. Supported data types are string, object and file\.$/;
        expect(() => exportConfig.set('chartConfig', exampleConfig))
          .to.throw(errorMsg)
          .with.property('name', errorName);
      });
    });
  });

  describe('ExportConfig.getFormattedConfigs', () => {
    it('should have clientName as NODE', () => {
      exportConfig.clear();
      const fmtConfig = exportConfig.getFormattedConfigs();
      expect(fmtConfig).to.have.property('clientName', 'NODE');
    });

    it('should have platform as os.platform()', () => {
      exportConfig.clear();
      const fmtConfig = exportConfig.getFormattedConfigs();
      expect(fmtConfig).to.have.property('platform', os.platform());
    });
  });
});
