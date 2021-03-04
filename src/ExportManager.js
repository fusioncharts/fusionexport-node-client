const path = require("path");
const fs = require("fs-extra");
const _ = require("lodash");
const AdmZip = require("adm-zip");
const tmp = require("tmp");
const { URL } = require("url");
const fetch = require("node-fetch");
const FormData = require("form-data");
const { EventEmitter } = require("events");
const config = require("./config.js");
const https = require('https');
const agent = new https.Agent({
  rejectUnauthorized: false
})
class ExportManager extends EventEmitter {
  constructor(options) {
    super();
    this.config = options ? Object.assign({}, config, options) : config;
    this.url = `${this.config.host}:${this.config.port}`;
    this.api = `/api/v2.0/export`;
  }
  async getUrl() {
    if(this.config.isSecure) {
      try {
        const url = `https://${this.url}`;
        await fetch(url, {
          method: 'GET',
          agent
        });
        return `${url}${this.api}`;
      } catch(e) {
        this.config.isSecure = false;
        console.warn('Warning: HTTPS server not found, overriding requests to an HTTP server.');
      }
    }
    return `http://${this.url}${this.api}`
  }

  export(exportConfig, dirPath = ".", unzip = true, exportBulk=true) {
    return new Promise(async (resolve, reject) => {
	  exportConfig.set("exportBulk", exportBulk);
      const formData = _.cloneDeep(exportConfig.getFormattedConfigs({minifyResources: this.config.minifyResources || false}));
      if (formData.payload) {
        formData.payload = fs.createReadStream(formData.payload);
      }
	  try {
        const url = await this.getUrl();
        const content = await ExportManager.sendToServer(url, formData, this.config.isSecure);
        const zipFile = ExportManager.saveZip(content);
        const files = ExportManager.saveExportedFiles(zipFile, dirPath, unzip);
        resolve(files);
      } catch (error) {
        reject(error);
      }
    });
  }

  exportAsStream(exportConfig) {
    return new Promise(async (resolve, reject) => {
      const formData = _.cloneDeep(exportConfig.getFormattedConfigs());
      if (formData.payload) {
        formData.payload = fs.createReadStream(formData.payload);
      }
      try {
        const url = await this.getUrl();
        const content = await ExportManager.sendToServer(url, formData, this.config.isSecure);
        const streams = ExportManager.unzipAsStream(content);
        resolve(streams);
      } catch (error) {
        reject(error);
      }
    });
  }

  static async sendToServer(serverUrl, formData, isSecure) {
    return new Promise(async (resolve, reject) => {
      const form = new FormData();
      Object.keys(formData).forEach(key => {
        form.append(key, formData[key]);
      });
      const options = {
        method: "POST",
        body: form,
      };
      if(isSecure) options.agent = agent;
      fetch(serverUrl, options)
        .then(async res => {
          if (res.status === 500) {
            const { error = "" } = await res.json();
            const serverError = new Error(error);
            serverError.name = "Server Error";
            return reject(serverError);
          }

          if (res.status === 200) {
            return resolve(await res.buffer());
          }

          if (res.status === 404) {
            const notFoundError = new Error("API URL not found");
            notFoundError.name = "URL Not Found Error";
            return reject(notFoundError);
          }

          return reject(new Error(await res.json().error));
        })
        .catch(err => {
          if (err.code === "ECONNREFUSED") {
            const url = new URL(serverUrl);
            const connRefusedError = new Error(
              `Unable to connect to FusionExport server. Make sure that your server is running on ${url.host}`
            );
            connRefusedError.name = "Connection Refused";
            reject(connRefusedError);
            return;
          }

          reject(err.message);
        });
    });
  }

  static unzipAsStream(buf) {
    const zip = new AdmZip(buf);
    const zipEntries = zip.getEntries();
    const contents = {};
    for (let i = 0; i < zipEntries.length; i += 1) {
      const file = zip.readFile(zipEntries[i]);
      contents[zipEntries[i].entryName] = file;
    }
    return contents;
  }

  static saveZip(content) {
    const zipFile = tmp.fileSync({ postfix: ".zip" });
    fs.writeFileSync(zipFile.name, content);
    return zipFile.name;
  }

  static saveExportedFiles(exportedFile, dirPath = ".", unzip = true) {
    if (!exportedFile) {
      throw new Error("Exported files are missing");
    }

    fs.ensureDirSync(dirPath);

    const savedFiles = [];

    if (unzip) {
      const zip = AdmZip(exportedFile);
      zip.extractAllTo(dirPath, true);
      const extractedFiles = zip.getEntries().map(entry => path.resolve(dirPath, entry.entryName));
      savedFiles.push(...extractedFiles);
    } else {
      const filename = "fusioncharts-export.zip";
      const savedFile = path.resolve(dirPath, filename);
      fs.copySync(exportedFile, savedFile);
      savedFiles.push(savedFile);
    }

    return savedFiles;
  }
}

module.exports = ExportManager;
