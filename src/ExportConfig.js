const os = require('os');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const jsdom = require('jsdom');
const tmp = require('tmp');
const JSZip = require('node-zip');
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
  object:[]
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

const mapConverterNameToConverter = {
  BooleanConverter: booleanConverter,
  NumberConverter: numberConverter,
};

const CHARTCONFIG = 'chartConfig';
const INPUTSVG = 'inputSVG';
const CALLBACKS = 'callbackFilePath';
const DASHBOARDLOGO = 'dashboardLogo';
const OUTPUTFILEDEFINITION = 'outputFileDefinition';
const CLIENTNAME = 'clientName';
const PLATFORM = 'platform';
const TEMPLATE = 'templateFilePath';
const RESOURCES = 'resourceFilePath';
const FONTS = 'fontDirPath';


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
    reqdTyping.converter = reqdTyping.converter || '';
    const converterName = reqdTyping.converter.toLowerCase();
    const converterFunction = mapConverterNameToConverter[converterName];

    if (converterFunction !== undefined) {
      return converterFunction(configValue);
    }
    return configValue;
  }

  checkTypings(configName, configValue) {
    const reqdTyping = this.typings[configName];
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

    if (clonedObj.has(CHARTCONFIG)) {
      const oldValue = clonedObj.get(CHARTCONFIG);
      clonedObj.remove(CHARTCONFIG);

      let newValue = oldValue;
      if (oldValue.endsWith('.json')) {
        newValue = readFileContent(oldValue, false);
      }

      clonedObj.set(CHARTCONFIG, newValue);
    }

    if (clonedObj.has(INPUTSVG)) {
      const oldValue = clonedObj.get(INPUTSVG);
      clonedObj.remove(INPUTSVG);

      clonedObj.set(INPUTSVG, readFileContent(oldValue, true));
    }

    if (clonedObj.has(CALLBACKS)) {
      const oldValue = clonedObj.get(CALLBACKS);
      clonedObj.remove(CALLBACKS);

      clonedObj.set(CALLBACKS, readFileContent(oldValue, true));
    }

    if (clonedObj.has(DASHBOARDLOGO)) {
      const oldValue = clonedObj.get(DASHBOARDLOGO);
      clonedObj.remove(DASHBOARDLOGO);

      clonedObj.set(DASHBOARDLOGO, readFileContent(oldValue, true));
    }

    if (clonedObj.has(OUTPUTFILEDEFINITION)) {
      const oldValue = clonedObj.get(OUTPUTFILEDEFINITION);
      clonedObj.remove(OUTPUTFILEDEFINITION);

      clonedObj.set(OUTPUTFILEDEFINITION, readFileContent(oldValue, true));
    }

    if (clonedObj.has(TEMPLATE)) {
      const { contentZipbase64, templatePathWithinZip, fontDirPathWithinZip } = clonedObj.createBase64ZippedTemplate();
      clonedObj.set(RESOURCES, contentZipbase64);
      clonedObj.set(TEMPLATE, templatePathWithinZip);
      clonedObj.set(FONTS, fontDirPathWithinZip);
    }

    return clonedObj;
  }

  getFormattedConfigs() {
    const processedObj = this.cloneWithProcessedProperties();
    return processedObj.toJSON();
  }

  createBase64ZippedTemplate() {
    const listExtractedPaths = this.findResources();
    let { baseDirectoryPath, listResourcePaths } = this.resolveResourceGlobFiles();
    const templateFilePath = this.get(TEMPLATE);
    const fontDirPath = this.get(FONTS);

    // If basepath is not provided, find it
    // from common ancestor directory of extracted file paths plus template
    if (baseDirectoryPath === undefined) {
      const listExtractedPathsPlusTemplate = [];
      Array.prototype.push.apply(listExtractedPathsPlusTemplate, listExtractedPaths);
      listExtractedPathsPlusTemplate.push(templateFilePath);

      var fontFilePaths=[];
      for (let index = 0; index < fontDirPath.length; index++) {
        const element = fontDirPath[index];
        listExtractedPathsPlusTemplate.push(element);
        fontFilePaths.push(element)
      }

      const commonDirectoryPath = getCommonAncestorDirectory(listExtractedPathsPlusTemplate);

      baseDirectoryPath = commonDirectoryPath;
    }

    // Filter listResourcePaths to those only which are within basePath
    listResourcePaths = listResourcePaths
      .filter(tmpPath => isWithinPath(tmpPath, baseDirectoryPath));

    const zipFile = ExportConfig.generateZip([
      ...listExtractedPaths, ...listResourcePaths, templateFilePath].concat(fontFilePaths), baseDirectoryPath);
      var fontDirPathWithinZip=[];
      for (let index = 0; index < fontFilePaths.length; index++) {
        const element = fontFilePaths[index];
        fontDirPathWithinZip.push(getRelativePathFrom(element, baseDirectoryPath))
      }

    return {
      contentZipbase64: readFileContent(path.resolve(zipFile.name), true),
      templatePathWithinZip: getRelativePathFrom(templateFilePath, baseDirectoryPath),
      fontDirPathWithinZip: fontDirPathWithinZip,
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

  static generateZip(listAllFilePaths, baseDirectoryPath) {
    const zip = new JSZip();

    /* eslint-disable no-restricted-syntax */
    for (const filePath of listAllFilePaths) {
      const fileContentBuffer = fs.readFileSync(filePath);
      const filePathWithinZip = getRelativePathFrom(filePath, baseDirectoryPath);
      zip.file(filePathWithinZip, fileContentBuffer);
    }
    /* eslint-enable no-restricted-syntax */

    const content = zip.generate({ type: 'nodebuffer', compression: 'DEFLATE' });

    const zipFile = tmp.fileSync({ postfix: '.zip' });

    fs.writeFileSync(zipFile.name, content, 'binary');

    return zipFile;
  }
}

module.exports = ExportConfig;
