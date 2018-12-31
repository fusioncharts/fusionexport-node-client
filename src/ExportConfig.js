const os = require('os');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const jsdom = require('jsdom');
const tmp = require('tmp');
const AdmZip = require('adm-zip');
const glob = require('glob');

const {
  getCommonAncestorDirectory,
  getRelativePathFrom,
  isWithinPath,
  isLocalResource,
  readFileContent,
  diffArrays,
} = require('./utils');

const metadataFolderPath = path.join(__dirname, '../metadata');
const metadataFilePath = path.join(metadataFolderPath, 'fusionexport-meta.json');
const typingsFilePath = path.join(metadataFolderPath, 'fusionexport-typings.json');

const mapMetadataTypeNameToJSValue = {
  string: '',
  boolean: true,
  integer: 1,
  enum: '',
};

function booleanConverter(value) {
  if (typeof value === typeof mapMetadataTypeNameToJSValue.string) {
    const stringValue = value.toLowerCase();
    if (stringValue === 'true') {
      return true;
    } else if (stringValue === 'false') {
      return false;
    }
    throw Error("Couldn't convert to boolean");
  } else if (typeof value === typeof mapMetadataTypeNameToJSValue.number) {
    const numberValue = value;
    if (numberValue === 1) {
      return true;
    } else if (numberValue === 0) {
      return false;
    }
    throw Error("Couldn't convert to boolean");
  } else if (typeof value === typeof mapMetadataTypeNameToJSValue.boolean) {
    return value;
  }

  throw Error("Couldn't convert to boolean");
}

function numberConverter(value) {
  if (typeof value === typeof mapMetadataTypeNameToJSValue.string) {
    const stringValue = value;
    const numberValue = Number(stringValue);

    if (!Number.isNaN(numberValue)) {
      return numberValue;
    }
    throw Error("Couldn't convert to number");
  } else if (typeof value === typeof mapMetadataTypeNameToJSValue.number) {
    const numberValue = value;
    return numberValue;
  }

  throw Error("Couldn't convert to number");
}

function enumConverter(value, dataset) {
  if (!dataset.includes(value)) {
    throw Error(`${value} is not in supported set`);
  }

  return value;
}

function chartConfigConverter(value) {
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return value;
}

const mapConverterNameToConverter = {
  BooleanConverter: booleanConverter,
  NumberConverter: numberConverter,
  EnumConverter: enumConverter,
  ChartConfigConverter: chartConfigConverter,
};

const CHARTCONFIG = 'chartConfig';
const INPUTSVG = 'inputSVG';
const CALLBACKS = 'callbackFilePath';
const DASHBOARDLOGO = 'dashboardLogo';
const OUTPUTFILEDEFINITION = 'outputFileDefinition';
const CLIENTNAME = 'clientName';
const PLATFORM = 'platform';
const TEMPLATE = 'templateFilePath';
const ASYNCCAPTURE = 'asyncCapture';
const PAYLOAD = 'payload';

class ExportConfig {
  constructor() {
    this.configs = new Map();
    this.metadata = JSON.parse(fs.readFileSync(metadataFilePath));
    this.typings = JSON.parse(fs.readFileSync(typingsFilePath));
    this.disableTypeCheck = false;
    this.clientName = 'NODE';
  }

  set(name, value) {
    const configName = name;
    let configValue = value;
    if (typeof name !== 'string') {
      throw new Error('Only strings are allowed as a key name');
    }

    if (!this.disableTypeCheck) {
      configValue = this.tryConvertType(configName, configValue);
      this.checkTypings(configName, configValue);
    }
    this.configs.set(configName, configValue);

    return this;
  }

  tryConvertType(configName, configValue) {
    const reqdTyping = this.typings[configName];

    if (!reqdTyping) {
      throw new Error(`${configName} is not allowed`);
    }

    const converterName = reqdTyping.converter || '';
    const converterFunction = mapConverterNameToConverter[converterName];
    const { dataset } = reqdTyping;

    if (converterFunction !== undefined) {
      return converterFunction(configValue, dataset);
    }
    return configValue;
  }

  checkTypings(configName, configValue) {
    const reqdTyping = this.typings[configName];

    if (!reqdTyping) {
      throw new Error(`${configName} is not allowed`);
    }

    const valueOfType = mapMetadataTypeNameToJSValue[reqdTyping.type];

    if (typeof configValue !== typeof valueOfType) {
      throw new Error(`${configName} of type ${typeof configValue} is not allowed`);
    }
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

  toJSON() {
    const selfObj = this.toObject();
    return JSON.stringify(selfObj);
  }

  toObject() {
    const obj = Object.create(null);

    /* eslint-disable no-restricted-syntax */
    for (const [k, v] of this.configs) {
      // We don’t escape the key '__proto__'
      // which can cause problems on older engines
      obj[k] = v;
    }
    /* eslint-enable no-restricted-syntax */

    return obj;
  }

  cloneWithProcessedProperties() {
    const clonedObj = _.cloneDeep(this);
    clonedObj.disableTypeCheck = true;

    clonedObj.set(CLIENTNAME, this.clientName);
    clonedObj.set(PLATFORM, os.platform());

    const zipBag = [];

    if (clonedObj.has(CHARTCONFIG)) {
      const chartConfigVal = clonedObj.get(CHARTCONFIG);
      clonedObj.remove(CHARTCONFIG);

      if (chartConfigVal.endsWith('.json')) {
        this.set(CHARTCONFIG, readFileContent(chartConfigVal, false));
      }

      clonedObj.set(CHARTCONFIG, this.get(CHARTCONFIG));
    }

    if (clonedObj.has(INPUTSVG)) {
      const oldValue = clonedObj.get(INPUTSVG);
      clonedObj.remove(INPUTSVG);

      const internalFilePath = 'inputSVG.svg';
      zipBag.push({
        internalPath: internalFilePath,
        externalPath: oldValue,
      });
      clonedObj.set(INPUTSVG, internalFilePath);
    }

    if (clonedObj.has(CALLBACKS)) {
      const oldValue = clonedObj.get(CALLBACKS);
      clonedObj.remove(CALLBACKS);

      const internalFilePath = 'callbackFile.js';
      zipBag.push({
        internalPath: internalFilePath,
        externalPath: oldValue,
      });
      clonedObj.set(CALLBACKS, internalFilePath);
    }

    if (clonedObj.has(DASHBOARDLOGO)) {
      const oldValue = clonedObj.get(DASHBOARDLOGO);
      clonedObj.remove(DASHBOARDLOGO);

      const ext = path.extname(oldValue);
      const internalFilePath = `dashboardLogo${ext}`;
      zipBag.push({
        internalPath: internalFilePath,
        externalPath: oldValue,
      });
      clonedObj.set(DASHBOARDLOGO, internalFilePath);
    }

    if (clonedObj.has(OUTPUTFILEDEFINITION)) {
      const oldValue = clonedObj.get(OUTPUTFILEDEFINITION);
      clonedObj.remove(OUTPUTFILEDEFINITION);

      const internalFilePath = 'outputFileDefinition.js';
      zipBag.push({
        internalPath: internalFilePath,
        externalPath: oldValue,
      });
      clonedObj.set(OUTPUTFILEDEFINITION, internalFilePath);
    }

    if (clonedObj.has(TEMPLATE)) {
      const templateVal = clonedObj.get(TEMPLATE);
      clonedObj.remove(TEMPLATE);

      if (templateVal.startsWith('<') && templateVal.endsWith('>')) {
        this.set(TEMPLATE, this.saveSerializedTemlateToFile());
      }

      const { zipPaths, templatePathWithinZip } = this.createTemplateZipPaths();
      zipBag.push(...zipPaths);
      clonedObj.set(TEMPLATE, templatePathWithinZip);
    }

    if (clonedObj.has(ASYNCCAPTURE)) {
      const oldValue = clonedObj.get(ASYNCCAPTURE);
      clonedObj.remove(ASYNCCAPTURE);

      if (oldValue) {
        clonedObj.set(ASYNCCAPTURE, 'true');
      }
    }

    if (zipBag.length > 0) {
      const zipFile = ExportConfig.generateZip(zipBag);
      clonedObj.set(PAYLOAD, zipFile);
    }

    return clonedObj;
  }

  getFormattedConfigs() {
    const clonedObj = this.cloneWithProcessedProperties();

    const { typings } = clonedObj;

    const keys = Array.from(clonedObj.configs.keys());
    const processedObj = keys.reduce((obj, key) => {
      const val = clonedObj.configs.get(key);

      if (key === 'resourceFilePath') return obj;

      if (key === 'payload') {
        // eslint-disable-next-line no-param-reassign
        obj[key] = val;
      }

      if (Object.hasOwnProperty.call(typings, key)) {
        // eslint-disable-next-line no-param-reassign
        obj[key] = val;
      }

      return obj;
    }, {});

    return processedObj;
  }

  saveSerializedTemlateToFile() {
    const template = this.get(TEMPLATE);
    const tmpFile = tmp.fileSync({ postfix: '.html' });
    fs.writeFileSync(tmpFile.name, template);
    return tmpFile.name;
  }

  createTemplateZipPaths() {
    const listExtractedPaths = this.findResources();
    let { baseDirectoryPath, listResourcePaths } = this.resolveResourceGlobFiles();
    const templateFilePath = this.get(TEMPLATE);

    // If basepath is not provided, find it
    // from common ancestor directory of extracted file paths plus template
    if (baseDirectoryPath === undefined) {
      const listExtractedPathsPlusTemplate = [];
      Array.prototype.push.apply(listExtractedPathsPlusTemplate, listExtractedPaths);
      listExtractedPathsPlusTemplate.push(templateFilePath);

      const commonDirectoryPath = getCommonAncestorDirectory(listExtractedPathsPlusTemplate);

      baseDirectoryPath = commonDirectoryPath;
    }

    // Filter listResourcePaths to those only which are within basePath
    listResourcePaths = listResourcePaths
      .filter(tmpPath => isWithinPath(tmpPath, baseDirectoryPath));

    const zipPaths = ExportConfig.generatePathForZip([
      ...listExtractedPaths, ...listResourcePaths, templateFilePath,
    ], baseDirectoryPath);

    const prefixedZipPaths = zipPaths.map(zipPath => ({
      internalPath: path.join('template', zipPath.internalPath),
      externalPath: zipPath.externalPath,
    }));

    const templatePathWithinZip = path.join(
      'template',
      getRelativePathFrom(templateFilePath, baseDirectoryPath),
    );

    return {
      zipPaths: prefixedZipPaths,
      templatePathWithinZip,
    };
  }

  findResources() {
    const templateFilePath = this.get(TEMPLATE);

    if (templateFilePath !== undefined) {
      const templateDirectory = path.dirname(templateFilePath);
      const html = fs.readFileSync(path.resolve(templateFilePath));
      const { JSDOM } = jsdom;
      const { window: { document } } = new JSDOM(html);

      const links = [...document.querySelectorAll('link')].map(l => l.href);
      const scripts = [...document.querySelectorAll('script')].map(s => s.src);
      const imgs = [...document.querySelectorAll('img')].map(i => i.src);

      const linkURLs = links.filter(isLocalResource).map(link =>
        path.resolve(templateDirectory, link));
      const scriptURLs = scripts.filter(isLocalResource).map(script =>
        path.resolve(templateDirectory, script));
      const imgURLs = imgs.filter(isLocalResource).map(img =>
        path.resolve(templateDirectory, img));

      return [...linkURLs, ...scriptURLs, ...imgURLs];
    }
    return [];
  }

  resolveResourceGlobFiles() {
    let baseDirectoryPath;
    let listResourcePaths = [];

    if (!this.has('resourceFilePath')) {
      return {
        baseDirectoryPath,
        listResourcePaths,
      };
    }

    const resourceFilePath = _.clone(this.get('resourceFilePath'));
    let resourceDirectoryPath = path.dirname(resourceFilePath);

    // Load resourceFilePath content (JSON) as instance of Resources
    const resources = JSON.parse(fs.readFileSync(resourceFilePath));
    resources.include = resources.include || [];
    resources.exclude = resources.exclude || [];
    // New attribute `resolvePath` - overloads actual direcotry location for glob resolve
    if (resources.resolvePath !== undefined) {
      resourceDirectoryPath = resources.resolvePath;
    }

    {
      const listResourceIncludePaths = [];
      const listResourceExcludePaths = [];

      /* eslint-disable no-restricted-syntax */
      for (const eachIncludePath of resources.include) {
        const matchedFiles = glob.sync(eachIncludePath, { cwd: resourceDirectoryPath });
        listResourceIncludePaths.push.apply(matchedFiles);
      }

      for (const eachExcludePath of resources.exclude) {
        const matchedFiles = glob.sync(eachExcludePath, { cwd: resourceDirectoryPath });
        listResourceExcludePaths.push.apply(matchedFiles);
      }
      /* eslint-enable no-restricted-syntax */

      listResourcePaths = diffArrays(listResourceIncludePaths, listResourceExcludePaths);
      baseDirectoryPath = resources.basePath;
    }

    return {
      baseDirectoryPath,
      listResourcePaths,
    };
  }

  static generatePathForZip(listAllFilePaths, baseDirectoryPath) {
    return listAllFilePaths.map((filePath) => {
      const filePathWithinZip = getRelativePathFrom(filePath, baseDirectoryPath);
      return {
        internalPath: filePathWithinZip,
        externalPath: filePath,
      };
    });
  }

  static generateZip(fileBag) {
    const zip = new AdmZip();

    fileBag.forEach((file) => {
      const internalDir = path.dirname(file.internalPath);
      const internalName = path.basename(file.internalPath);
      zip.addLocalFile(file.externalPath, internalDir, internalName);
    });

    const zipFile = tmp.fileSync({ postfix: '.zip' });

    zip.writeZip(zipFile.name);

    return zipFile.name;
  }
}

module.exports = ExportConfig;
