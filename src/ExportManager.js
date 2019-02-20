// const WebSocket = require('ws');
const path = require('path');
const fs = require('fs-extra');
const _ = require('lodash');
const AdmZip = require('adm-zip');
const tmp = require('tmp');
const request = require('request');
const { EventEmitter } = require('events');
const config = require('./config.js');

class ExportManager extends EventEmitter {
  constructor(options) {
    super();
    this.config = options ? Object.assign({}, config, options) : config;
    this.config.url = `http://${this.config.host}:${this.config.port}/api/v2.0/export`;
  }

  export(exportConfig, dirPath = '.', unzip = false) {
    return new Promise((resolve, reject) => {
      const formData = _.cloneDeep(exportConfig.getFormattedConfigs());

      if (formData.payload) {
        formData.payload = fs.createReadStream(formData.payload);
      }

      request.post({
        url: this.config.url,
        encoding: null,
        formData,
      }, (err, httpResponse, body) => {
        if (err) {
          if (err.code === 'ECONNREFUSED') {
            const connRefusedError = new Error(`Unable to connect to FusionExport server. Make sure that your server is running on ${err.address}:${err.port}.`);
            connRefusedError.name = 'Connection Refused';
            reject(connRefusedError);
            return;
          }

          reject(err);
          return;
        }

        if (httpResponse.statusCode === 500) {
          let errMsg = body.toString();

          try {
            errMsg = JSON.parse(errMsg).error;
          } catch (e) {
            // continue regardless of error
          }

          const serverError = new Error(errMsg);
          serverError.name = 'Server Error';
          reject(serverError);
          return;
        }

        if (httpResponse.statusCode !== 200) {
          reject(new Error(body.toString()));
          return;
        }

        const zipFile = ExportManager.saveZip(body);
        resolve(ExportManager.saveExportedFiles(zipFile, dirPath, unzip));
      });
    });
  }

  static saveZip(content) {
    const zipFile = tmp.fileSync({ postfix: '.zip' });
    fs.writeFileSync(zipFile.name, content);
    return zipFile.name;
  }

  static saveExportedFiles(exportedFile, dirPath = '.', unzip = false) {
    if (!exportedFile) {
      throw new Error('Exported files are missing');
    }

    fs.ensureDirSync(dirPath);

    const savedFiles = [];

    if (unzip) {
      const zip = AdmZip(exportedFile);
      zip.extractAllTo(dirPath, true);
      const extractedFiles = zip.getEntries().map(entry => path.resolve(dirPath, entry.entryName));
      savedFiles.push(...extractedFiles);
    } else {
      const filename = 'fusioncharts-export.zip';
      const savedFile = path.resolve(dirPath, filename);
      fs.copySync(exportedFile, savedFile);
      savedFiles.push(savedFile);
    }

    return savedFiles;
  }
}

module.exports = ExportManager;
