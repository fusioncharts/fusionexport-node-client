const os = require("os");
const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const jsdom = require("jsdom");
const tmp = require("tmp");
const AdmZip = require("adm-zip");
const glob = require("glob");
const minifyFiles = require('sync-rpc')(__dirname+'/minifyfile.js');

const {
  getCommonAncestorDirectory,
  getRelativePathFrom,
  isWithinPath,
  isLocalResource,
  readFileContent,
  diffArrays,
  humanizeArray,
} = require("./utils");

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
  if (typeof value === "string") {
    const stringValue = value.toLowerCase();
    if (stringValue === "true") {
      return true;
    } else if (stringValue === "false") {
      return false;
    }
    throw Error("Couldn't convert to boolean");
  } else if (typeof value === "number") {
    const numberValue = value;
    if (numberValue === 1) {
      return true;
    } else if (numberValue === 0) {
      return false;
    }
    throw Error("Couldn't convert to boolean");
  } else if (typeof value === "boolean") {
    return value;
  }

  throw Error("Couldn't convert to boolean");
}

function booleanToStringConverter(value) {
  if (typeof value === "string") {
    if (value === "true") return value;
    return "false";
  } else if (typeof value === "boolean") {
    return `${value}`;
  }
  throw Error("Couldn't convert to boolean");
}

function numberConverter(value) {
  if (typeof value === "string") {
    const stringValue = value;
    const numberValue = Number(stringValue);

    if (!Number.isNaN(numberValue)) {
      return numberValue;
    }
    throw Error("Couldn't convert to number");
  } else if (typeof value === "number") {
    const numberValue = value;
    return numberValue;
  }

  throw Error("Couldn't convert to number");
}

function enumConverter(value, dataset) {
  const lowerCasedDataset = dataset.map(d => d.toLowerCase());
  const lowerCasedValue = value.toLowerCase();

  if (!lowerCasedDataset.includes(lowerCasedValue)) {
    const enumParseError = new Error(
      `${value} is not in supported set. Supported values are ${humanizeArray(dataset)}`
    );
    enumParseError.name = "Enum Parse Error";
    enumParseError.dataset = dataset;
    throw enumParseError;
  }

  return lowerCasedValue;
}

function objectConverter(value) {
  if (typeof value === "object" && value !== null) {
    return JSON.stringify(value);
  } else if (typeof value === "string") {
    return value;
  }

  return String(value);
}

function chartConfigConverter(value) {
  if (typeof value === "object") {
    let configList = value;

    if (!Array.isArray(value)) {
      configList = [value];
    }

    configList.forEach(config => {
      if (!config.dataSource || !config.type) {
        const invalidJSONError = new Error("JSON structure is invalid. Please check your JSON data.");
        invalidJSONError.name = "Invalid JSON";
        throw invalidJSONError;
      }
    });

    return JSON.stringify(configList);
  }

  return value;
}

const mapConverterNameToConverter = {
  BooleanConverter: booleanConverter,
  BooleanToStringConverter: booleanToStringConverter,
  NumberConverter: numberConverter,
  EnumConverter: enumConverter,
  ChartConfigConverter: chartConfigConverter,
  ObjectConverter: objectConverter,
};

const CHARTCONFIG = "chartConfig";
const INPUTSVG = "inputSVG";
const CALLBACKS = "callbackFilePath";
const DASHBOARDLOGO = "dashboardLogo";
const OUTPUTFILEDEFINITION = "outputFileDefinition";
const CLIENTNAME = "clientName";
const PLATFORM = "platform";
const TEMPLATE = "templateFilePath";
const ASYNCCAPTURE = "asyncCapture";
const PAYLOAD = "payload";
const MINIFY = "minifyResources";
const EXPORTBULK = "exportBulk"

class ExportConfig {
  constructor() {
    this.configs = new Map();
    this.typings = JSON.parse(fs.readFileSync(typingsFilePath));
    this.disableTypeCheck = false;
    this.clientName = "NODE";
  }

  set(name, value) {
    const configName = name;
    let configValue = value;
    if (typeof name !== "string") {
      throw new Error("Only strings are allowed as a key name");
    }

    if (!this.disableTypeCheck) {
      this.checkInputTypings(configName, configValue);
      configValue = this.tryConvertType(configName, configValue);
      this.checkTypings(configName, configValue);
    }
    this.configs.set(configName, configValue);

    return this;
  }

  checkInputTypings(configName, configValue) {
    const reqdTyping = this.typings[configName];

    if (!reqdTyping) {
      const invalidConfigError = new Error(`${configName} is not allowed`);
      invalidConfigError.name = "Invalid Configuration";
      throw invalidConfigError;
    }

    const isSupported = reqdTyping.supportedTypes.some(type => {
      // eslint-disable-next-line valid-typeof
      if (typeof configValue === type) {
        return true;
      }

      return false;
    });

    if (!isSupported) {
      const invalidDataTypeError = new Error(
        `${configName} of type ${typeof configValue} is unsupported. Supported data types are ${humanizeArray(
          reqdTyping.supportedTypes
        )}.`
      );
      invalidDataTypeError.name = "Invalid Data Type";
      throw invalidDataTypeError;
    }
  }

  tryConvertType(configName, configValue) {
    const reqdTyping = this.typings[configName];

    if (!reqdTyping) {
      const invalidConfigError = new Error(`${configName} is not allowed`);
      invalidConfigError.name = "Invalid Configuration";
      throw invalidConfigError;
    }

    const converterName = reqdTyping.converter || "";
    const converterFunction = mapConverterNameToConverter[converterName];
    const { dataset } = reqdTyping;

    if (converterFunction !== undefined) {
      return converterFunction(configValue, dataset);
    }

    return configValue;
  }

  checkTypings(configName) {
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

    if (clonedObj.get("templateFilePath") && clonedObj.get("template")) {
      console.warn("Both 'templateFilePath' and 'template' is provided. 'templateFilePath' will be ignored.");
      clonedObj.remove("templateFilePath");
    }

    const zipBag = [];

    if (clonedObj.has(CHARTCONFIG)) {
      const chartConfigVal = clonedObj.get(CHARTCONFIG);
      clonedObj.remove(CHARTCONFIG);

      if (chartConfigVal.endsWith(".json")) {
        this.set(CHARTCONFIG, readFileContent(chartConfigVal, false));
      }

      clonedObj.set(CHARTCONFIG, this.get(CHARTCONFIG));
    }

    if (clonedObj.has(INPUTSVG)) {
      const oldValue = clonedObj.get(INPUTSVG);
      clonedObj.remove(INPUTSVG);

      const internalFilePath = "inputSVG.svg";
      zipBag.push({
        internalPath: internalFilePath,
        externalPath: oldValue,
      });
      clonedObj.set(INPUTSVG, internalFilePath);
    }

    if (clonedObj.has(CALLBACKS)) {
      const oldValue = clonedObj.get(CALLBACKS);
      clonedObj.remove(CALLBACKS);

      const internalFilePath = "callbackFile.js";
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

      const internalFilePath = "outputFileDefinition.js";
      zipBag.push({
        internalPath: internalFilePath,
        externalPath: oldValue,
      });
      clonedObj.set(OUTPUTFILEDEFINITION, internalFilePath);
    }

    if (clonedObj.has(TEMPLATE)) {
      // const templateVal = clonedObj.get(TEMPLATE);
      clonedObj.remove(TEMPLATE);

      const { zipPaths, templatePathWithinZip } = this.createTemplateZipPaths();
      zipBag.push(...zipPaths);
      clonedObj.set(TEMPLATE, templatePathWithinZip);
    }

    if (clonedObj.has(ASYNCCAPTURE)) {
      const oldValue = clonedObj.get(ASYNCCAPTURE);
      clonedObj.remove(ASYNCCAPTURE);

      if (oldValue) {
        clonedObj.set(ASYNCCAPTURE, "true");
      }
    }

	if (clonedObj.has(EXPORTBULK)) {
		const oldValue = clonedObj.get(EXPORTBULK);
		clonedObj.remove(EXPORTBULK);
  
		if (!oldValue) {
		  clonedObj.set(EXPORTBULK, "");
		}
	}

    if (zipBag.length > 0) {
      const zipFile = ExportConfig.generateZip(zipBag, this.get(MINIFY));
      clonedObj.set(PAYLOAD, zipFile);
    }

    return clonedObj;
  }

  getFormattedConfigs(options) {
    if (options && options.minifyResources) this.set(MINIFY, options.minifyResources);
    let clonedObj = {};

    try {
      clonedObj = this.cloneWithProcessedProperties();
    } catch (e) {
      if (e.code === "ENOENT" && !!e.path) {
        const fileNotFoundError = new Error(
          `The file '${e.path}' which you have provided does not exist. Please provide a valid file.`
        );
        fileNotFoundError.name = "File Not Found";
        fileNotFoundError.path = e.path;

        throw fileNotFoundError;
      }

      throw e;
    }

    const { typings } = clonedObj;

    const keys = Array.from(clonedObj.configs.keys());
    const processedObj = keys.reduce((obj, key) => {
      const val = clonedObj.configs.get(key);

      if (key === "resourceFilePath") return obj;

      if (key === "payload") {
        // eslint-disable-next-line no-param-reassign
        obj[key] = val;
      }

      if (Object.hasOwnProperty.call(typings, key)) {
        // eslint-disable-next-line no-param-reassign
        obj[key] = val;
      }

      return obj;
    }, {});

    if (!!processedObj.templateFormat && (processedObj.type && processedObj.type !== "pdf")) {
      console.warn("templateFormat is not supported for types other than PDF. It will be ignored.");
    }

    processedObj[CLIENTNAME] = this.clientName;
    processedObj[PLATFORM] = os.platform();

    return processedObj;
  }

  createTemplateZipPaths() {
    const listExtractedPaths = this.findResources();
    let { baseDirectoryPath, listResourcePaths } = this.resolveResourceGlobFiles();
    const templateFilePath = this.get(TEMPLATE);
    const isMinified = this.get(MINIFY)==="true";
    const minifiedHash = `.min-fusionexport-${Date.now()}`;
    const minifiedExtension = isMinified ?minifiedHash :"";

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
    listResourcePaths = listResourcePaths.filter(tmpPath => isWithinPath(tmpPath, baseDirectoryPath));

    const zipPaths = ExportConfig.generatePathForZip(
      [...listExtractedPaths, ...listResourcePaths, templateFilePath],
      baseDirectoryPath
    );

    const prefixedZipPaths = zipPaths.map(zipPath => {
      const internalDir = path.dirname(zipPath.internalPath);
      const fileExtension = path.extname(zipPath.internalPath);
      const fileName = path.basename(zipPath.internalPath, fileExtension);
      return { 
        internalPath: ExportConfig.isHtmlJsCss(zipPath) ?path.join("template", `${internalDir}/${fileName}${minifiedExtension}${fileExtension}`) :path.join("template", zipPath.internalPath),
        externalPath: zipPath.externalPath,
       }
    });

    const rawTemplatePath = path.dirname(templateFilePath);
    const templateExtension = path.extname(templateFilePath);
    const templateFileName = path.basename(templateFilePath, templateExtension);

    const templatePathWithinZip = path.join("template", getRelativePathFrom(`${rawTemplatePath}/${templateFileName}${minifiedExtension}${templateExtension}`, baseDirectoryPath));
    
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
      const {
        window: { document },
      } = new JSDOM(html);

      const links = [...document.querySelectorAll('link')].map(l => l.href);
      const styles = [...document.styleSheets];
      
      let fontFileURLs=[];
      for(var i=0; i<styles.length; i++) {
        var sheet = styles[i];
            const regex = /url\((.*?)\).*?format\((\'|\")(.*?)(\'|\")\)/g;
            let m;
            let extractedFontURLs = []
            while ((m = regex.exec(sheet)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }
                let string = m[1].replace(/^"(.*)"$/, '$1')
                if(!path.extname(string)){
                  string = string + "." + m[3]
                }
                extractedFontURLs.push(string)
            }
          fontFileURLs.push(extractedFontURLs.filter(isLocalResource).map(url =>
              path.resolve(templateDirectory,url)))
      }
      
      links.forEach(link => {
        if(path.extname(link) == ".css"){
          const resolvedLink = path.resolve(templateDirectory, link);
          if(resolvedLink && fs.existsSync(resolvedLink)){
            const linkDirectory = path.dirname(resolvedLink);
            const css = fs.readFileSync(path.resolve(linkDirectory,resolvedLink),"utf8");
            const regex = /url\((.*?)\).*?format\((\'|\")(.*?)(\'|\")\)/g;
            let m;
            let extractedFontURLs = []
            while ((m = regex.exec(css)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }
                let string = m[1].replace(/["']/g, "");
                if(!path.extname(string)){
                  string = string + "." + m[3]
                }
                extractedFontURLs.push(string)
            }
            fontFileURLs.push(extractedFontURLs.filter(isLocalResource).map(url =>
              path.resolve(linkDirectory,url)))
          }
        }
      })
      
      var mergedFontFileURLs = [].concat.apply([], fontFileURLs);

      const scripts = [...document.querySelectorAll('script')].map(s => s.src);
      const imgs = [...document.querySelectorAll('img')].map(i => i.src);

      const linkURLs = links.filter(isLocalResource).map(link =>
        path.resolve(templateDirectory, link));
      const scriptURLs = scripts.filter(isLocalResource).map(script =>
        path.resolve(templateDirectory, script));
      const imgURLs = imgs.filter(isLocalResource).map(img =>
        path.resolve(templateDirectory, img));
      return [...linkURLs, ...scriptURLs, ...imgURLs, ...mergedFontFileURLs];
    }
    return [];
  }

  resolveResourceGlobFiles() {
    let baseDirectoryPath;
    let listResourcePaths = [];

    if (!this.has("resourceFilePath")) {
      return {
        baseDirectoryPath,
        listResourcePaths,
      };
    }

    const resourceFilePath = _.clone(this.get("resourceFilePath"));
    let resourceDirectoryPath = path.dirname(resourceFilePath);

    const resources = JSON.parse(fs.readFileSync(resourceFilePath));
    resources.include = resources.include || [];
    resources.exclude = resources.exclude || [];

    if (resources.resolvePath !== undefined) {
      resourceDirectoryPath = resources.resolvePath;
    }

    const listResourceIncludePaths = [];
    const listResourceExcludePaths = [];

    resources.include.forEach(includePath => {
      const matchedFiles = glob.sync(includePath, { cwd: resourceDirectoryPath });
      listResourceIncludePaths.push(matchedFiles);
    });

    resources.exclude.forEach(excludePath => {
      const matchedFiles = glob.sync(excludePath, { cwd: resourceDirectoryPath });
      listResourceExcludePaths.push(matchedFiles);
    });

    listResourcePaths = diffArrays(listResourceIncludePaths, listResourceExcludePaths);
    baseDirectoryPath = resources.basePath;

    return {
      baseDirectoryPath,
      listResourcePaths,
    };
  }

  static generatePathForZip(listAllFilePaths, baseDirectoryPath) {
    return listAllFilePaths.map(filePath => {
      const filePathWithinZip = getRelativePathFrom(filePath, baseDirectoryPath);
      return {
        internalPath: filePathWithinZip,
        externalPath: filePath,
      };
    });
  }

  static filterNEFiles(fileBag) {
    return fileBag.filter(file => {
      if (fs.existsSync(file.externalPath)) return true;
      console.warn(`File not found: ${file.externalPath}. Ignoring file.`);
      return false;
    });
  }

  static isHtmlJsCss(file){
	  return ['.html','.css','.js'].includes(path.extname(file.internalPath).toLowerCase());
  }

  static generateZip(fileBag, minify) {
    const zip = new AdmZip();
    const isMinified = minify==="true";

    const _fileBag = ExportConfig.filterNEFiles(fileBag);

    _fileBag.forEach(file => {
      const type = path.extname(file.internalPath);
      const processedFile = isMinified && ExportConfig.isHtmlJsCss(file) ? minifyFiles({file, type, zipbag: _fileBag}) :file;
      zip.addLocalFile(processedFile.externalPath, path.dirname(file.internalPath), path.basename(file.internalPath));
      if (isMinified && ExportConfig.isHtmlJsCss(file)) fs.unlinkSync(processedFile.externalPath);
    });

    const zipFile = tmp.fileSync({ postfix: ".zip" });

    zip.writeZip(zipFile.name);

    return zipFile.name;
  }
}

module.exports = ExportConfig;
