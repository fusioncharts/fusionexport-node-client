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

  export(exportConfig) {
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
          reject(err);
          return;
        }

        const zipFile = ExportManager.saveZip(body);
        resolve(zipFile);
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
    if (unzip) {
      const zip = AdmZip(exportedFile);
      zip.extractAllTo(dirPath, true);
    } else {
      const filename = 'fusioncharts-export.zip';
      fs.copySync(exportedFile, path.join(dirPath, filename));
    }
  }
}

module.exports = ExportManager;
