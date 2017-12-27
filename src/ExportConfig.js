const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const jsdom = require('jsdom');
const tmp = require('tmp');
const JSZip = require('node-zip');

const { stringifyWithFunctions } = require('./utils');

class ExportConfig {
  constructor() {
    this.configs = new Map();
    this.configsObj = {};
  }

  set(name, value) {
    if (typeof name !== 'string') {
      throw new Error('Only strings are allowed as a key name');
    }
    if (name) {
      switch (name) {
        case 'outputFileDefinition':
        case 'resourceFilePath':
          try {
            let resourceJSON;
            if (typeof value === 'string') {
              resourceJSON = JSON.parse(fs.readFileSync(path.resolve(value)));
            } else if (typeof value === 'object') {
              resourceJSON = _.clone(value);
            }
            this.configs.set(name, resourceJSON);
          } catch (e) {
            throw new Error(`Not a valid json ${e}`);
          }
          break;
        default:
          this.configs.set(name, value);
      }
    }
    return this;
  }

  get(name) {
    return this.configs.get(name);
  }

  remove(name) {
    this.configs.delete(name);
    return this;
  }

  has(name) {
    return this.configs.has(name);
  }

  clear() {
    this.configs.clear();
    return this;
  }

  count() {
    return this.configs.size;
  }

  configNames() {
    return Array.from(this.configs.keys());
  }

  configValues() {
    return Array.from(this.configs.values());
  }

  clone() {
    return new Map(this.configs);
  }

  populateConfigsObj() {
    this.configsObj = {};
    this.configsObj = Array.from(this.configs).reduce((obj, [name, value]) => {
      const modValue = this.getFormattedConfigValue(name, value);
      return Object.assign(this.configsObj, { [name]: modValue });
    }, {});
    this.configsObj.clientName = 'NODE';
  }

  getCofnigsObj() {
    this.populateConfigsObj();
    return this.configsObj;
  }

  getFormattedConfigs() {
    this.populateConfigsObj();
    return stringifyWithFunctions(this.configsObj);
  }

  static covertToBase64String(filePath) {
    return Buffer.from(fs.readFileSync(filePath)).toString('base64');
  }

  getFormattedConfigValue(name, value) {
    let fileContent;
    switch (name) {
      case 'chartConfig':
        return value;
      case 'asyncCapture':
      case 'exportAsZip':
        return value === 'true';
      case 'templateFilePath':
        return this.getZippedTemplate();
      case 'outputFileDefinition':
        if (typeof value === 'object') {
          fileContent = `module.exports = ${stringifyWithFunctions(value)}`;
        } else {
          fileContent = fs.readFileSync(value);
        }
        return Buffer.from(fileContent).toString('base64');
      case 'dashboardLogo':
      case 'callbackFilePath':
      case 'inputSVG':
        return ExportConfig.covertToBase64String(value);
      default:
        return value;
    }
  }

  getZippedTemplate() {
    this.findResources();
    this.generateResourceData();
    this.reReferenceTemplateUrls();
    const zipFile = this.generateZip();
    return ExportConfig.covertToBase64String(path.resolve(zipFile.name));
  }

  findResources() {
    const html = fs.readFileSync(path.resolve(this.get('templateFilePath'))).toString();
    const { JSDOM } = jsdom;
    const { window: { document } } = new JSDOM(html);

    let links = [...document.querySelectorAll('link')];
    let scripts = [...document.querySelectorAll('script')];
    let imgs = [...document.querySelectorAll('img')];

    links = links.map(link => link.href);
    scripts = scripts.map(script => script.src);
    imgs = imgs.map(img => img.src);

    const resources = {
      images: imgs,
      stylesheets: links,
      javascripts: scripts,
    };

    if (!this.has('resourceFilePath')) {
      this.set('resourceFilePath', resources);
      return;
    }

    const resourcesData = this.get('resourceFilePath');

    Object.keys(resources).forEach((key) => {
      resourcesData[key] =
        _.uniq(resources[key].concat(resourcesData[key] || []));
    });
    this.set('resourceFilePath', resourcesData);
  }

  generateResourceData() {
    let templateContext;

    if (!this.has('resourceFilePath')) {
      return;
    }

    this.removeRemoteResources();

    const resourceData = _.clone(this.get('resourceFilePath'));

    templateContext = '';
    if (this.has('templateFilePath')) {
      templateContext = path.dirname(path.resolve(this.get('templateFilePath')));
    }

    Object.keys(resourceData).forEach((key) => {
      resourceData[key] = resourceData[key].map((v) => {
        const tmpFile = tmp.tmpNameSync({ postfix: path.extname(v) });

        const ob = {
          real: v,
          abs: path.resolve(templateContext, v),
          zipPath: path.join(`resources/${key}`, path.basename(tmpFile)),
        };

        return ob;
      });
    });

    this.set('resourceFilePath', resourceData);
    this.deDuplicateResourceData();

    const resources = _.clone(this.get('resourceFilePath'));
    Object.keys(resources).forEach((key) => {
      resources[key] = resources[key].map(v => v.zipPath);
    });

    this.set('resourceFilePath', resourceData);
  }

  removeRemoteResources() {
    if (!this.has('resourceFilePath')) {
      return;
    }

    const resources = this.get('resourceFilePath');

    Object.keys(resources).forEach((key) => {
      resources[key] = resources[key].filter((v) => {
        if (v === '') {
          return false;
        }

        if (v.includes('https://')) {
          return false;
        }

        if (v.includes('http://')) {
          return false;
        }

        return true;
      });
    });
    this.set('resourceFilePath', resources);
  }

  deDuplicateResourceData() {
    const resources = this.get('resourceFilePath');
    Object.keys(resources).forEach((key) => {
      resources[key] = resources[key].map((val) => {
        const curr = val;
        const prev = resources[key].find(v => v.abs === curr.abs);
        if (prev) {
          curr.zipPath = prev.zipPath;
        }
        return curr;
      });
    });
    this.set('resourceFilePath', resources);
  }

  reReferenceTemplateUrls() {
    let html;

    if (!this.has('templateFilePath')) {
      return;
    }

    html = fs.readFileSync(path.resolve(this.get('templateFilePath')));
    const resources = this.get('resourceFilePath');
    Object.keys(resources).forEach((key) => {
      resources[key].forEach((v) => {
        html = html.toString().replace(new RegExp(v.real, 'g'), v.zipPath);
      });
    });

    const tmpTemplateFile = tmp.fileSync({ postfix: '.html' });
    fs.writeFileSync(tmpTemplateFile.name, html);

    this.set('templateFilePath', tmpTemplateFile.name);
  }

  generateZip() {
    const zip = new JSZip();
    if (this.has('templateFilePath')) {
      zip.file('template.html', fs.readFileSync(path.resolve(this.get('templateFilePath'))));
    }
    const resources = this.get('resourceFilePath');
    if (resources) {
      Object.keys(resources).forEach((key) => {
        resources[key].forEach((v) => {
          zip.file(v.zipPath, fs.readFileSync(v.abs));
        });
      });
    }

    const content = zip.generate({ type: 'nodebuffer', compression: 'DEFLATE' });

    const zipFile = tmp.fileSync({ postfix: '.zip' });

    fs.writeFileSync(zipFile.name, content, 'binary');

    return zipFile;
  }
}

module.exports = ExportConfig;
