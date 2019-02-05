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

    describe('templateWidth', () => {
      it('should take number', () => {
        const exampleTemplateWidth = 500;
        exportConfig.set('templateWidth', exampleTemplateWidth);
        expect(exportConfig.get('templateWidth')).to.equal(exampleTemplateWidth);
      });

      it('should take valid number as string', () => {
        const exampleTemplateWidthString = '700';
        const exampleTemplateWidthNumber = 700;
        exportConfig.set('templateWidth', exampleTemplateWidthString);
        expect(exportConfig.get('templateWidth')).to.equal(exampleTemplateWidthNumber);
      });

      it('should not take invalid number as string', () => {
        const exampleTemplateWidthString = 'notanumber';
        expect(() => exportConfig.set('templateWidth', exampleTemplateWidthString)).to.throw(/^Couldn't convert to number$/);
      });
    });

    describe('templateFormat', () => {
      it('should take valid string', () => {
        const exampleTemplateFormat = 'A4';
        exportConfig.set('templateFormat', exampleTemplateFormat);
        expect(exportConfig.get('templateFormat')).to.equal(exampleTemplateFormat.toLowerCase());
      });

      it('should not take invalid string', () => {
        const invalidTemplateFormat = 'AB4';
        expect(() => exportConfig.set('templateFormat', invalidTemplateFormat))
          .to.throw('AB4 is not in supported set.')
          .with.property('name', 'Enum Parse Error');
      });
    });

    describe('asyncCapture', () => {
      it('should take boolean', () => {
        const exampleAsyncCapture = true;
        exportConfig.set('asyncCapture', exampleAsyncCapture);
        expect(exportConfig.get('asyncCapture')).to.equal(exampleAsyncCapture);
      });

      it('should parse \'true\' as true', () => {
        const trueStr = 'true';
        exportConfig.set('asyncCapture', trueStr);
        expect(exportConfig.get('asyncCapture')).to.equal(true);
      });

      it('should parse \'false\' as false', () => {
        const falseStr = 'false';
        exportConfig.set('asyncCapture', falseStr);
        expect(exportConfig.get('asyncCapture')).to.equal(false);
      });

      it('should not parse invalid string', () => {
        const invalidBoolean = 'invalidBoolean';
        expect(() => exportConfig.set('asyncCapture', invalidBoolean)).to.throw(/^Couldn't convert to boolean$/);
      });
    });
  });

  describe('ExportConfig.getFormattedConfigs', () => {
    exportConfig.clear();
    const fmtConfig = exportConfig.getFormattedConfigs();

    it('should have clientName as NODE', () => {
      expect(fmtConfig).to.have.property('clientName', 'NODE');
    });

    it('should have platform as os.platform()', () => {
      expect(fmtConfig).to.have.property('platform', os.platform());
    });
  });
});
